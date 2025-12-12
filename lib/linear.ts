import 'server-only';

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const LINEAR_API_KEY = requireEnv('LINEAR_API_KEY');
const LINEAR_TEAM_KEY = requireEnv('LINEAR_TEAM_KEY');
const LINEAR_LABEL_NAME = requireEnv('LINEAR_LABEL_NAME');

async function linearGraphql<TData>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<TData> {
  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      // Linear expects the API key directly (no "Bearer " prefix)
      authorization: LINEAR_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Linear GraphQL HTTP ${res.status}: ${text || res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;
  if (json.errors?.length) {
    throw new Error(`Linear GraphQL error: ${json.errors.map((e) => e.message).join('; ')}`);
  }
  if (!json.data) throw new Error('Linear GraphQL error: missing data');
  return json.data;
}

export type LinearPriority = 'none' | 'urgent' | 'high' | 'medium' | 'low';

export function linearPriorityToNumber(priority: LinearPriority): number {
  switch (priority) {
    case 'none':
      return 0;
    case 'urgent':
      return 1;
    case 'high':
      return 2;
    case 'medium':
      return 3;
    case 'low':
      return 4;
    default: {
      const _exhaustive: never = priority;
      return _exhaustive;
    }
  }
}

export function linearPriorityLabel(priority: number): string {
  // Linear: 0 = no priority, 1..4 = urgent..low
  switch (priority) {
    case 0:
      return 'No priority';
    case 1:
      return 'Urgent';
    case 2:
      return 'High';
    case 3:
      return 'Medium';
    case 4:
      return 'Low';
    default:
      return `P${priority}`;
  }
}

type LinearContext = {
  teamId: string;
  labelId: string;
  backlogStateId: string;
};

let contextPromise: Promise<LinearContext> | null = null;

async function resolveContext(): Promise<LinearContext> {
  if (contextPromise) return contextPromise;

  contextPromise = (async () => {
    const teamData = await linearGraphql<{
      teams: {
        nodes: Array<{
          id: string;
          key: string;
          name: string;
          states: { nodes: Array<{ id: string; name: string; type: string }> };
        }>;
      };
    }>(
      /* GraphQL */ `
        query TeamByKey($teamKey: String!) {
          teams(filter: { key: { eq: $teamKey } }) {
            nodes {
              id
              key
              name
              states {
                nodes {
                  id
                  name
                  type
                }
              }
            }
          }
        }
      `,
      { teamKey: LINEAR_TEAM_KEY },
    );

    const team = teamData.teams.nodes[0] ?? null;
    if (!team) throw new Error(`Linear team not found for key: ${LINEAR_TEAM_KEY}`);

    const backlogState = team.states.nodes.find(
      (s) => s.name.trim().toLowerCase() === 'backlog',
    );
    if (!backlogState) {
      const names = team.states.nodes.map((s) => s.name).join(', ');
      throw new Error(`Linear state 'Backlog' not found for team ${LINEAR_TEAM_KEY}. Found: ${names}`);
    }

    const labelId = await resolveLabelId(team.id);

    return {
      teamId: team.id,
      labelId,
      backlogStateId: backlogState.id,
    };
  })();

  return contextPromise;
}

async function resolveLabelId(teamId: string): Promise<string> {
  const labelsData = await linearGraphql<{
    issueLabels: {
      nodes: Array<{ id: string; name: string; team: { id: string; key: string } | null }>;
    };
  }>(
    /* GraphQL */ `
      query IssueLabelsByName($labelName: String!) {
        issueLabels(filter: { name: { eq: $labelName } }) {
          nodes {
            id
            name
            team {
              id
              key
            }
          }
        }
      }
    `,
    { labelName: LINEAR_LABEL_NAME },
  );

  const existing = labelsData.issueLabels.nodes.find((l) => l.team?.id === teamId);
  if (existing) return existing.id;

  const created = await linearGraphql<{
    issueLabelCreate: { success: boolean; issueLabel: { id: string; name: string } | null };
  }>(
    /* GraphQL */ `
      mutation IssueLabelCreate($input: IssueLabelCreateInput!) {
        issueLabelCreate(input: $input) {
          success
          issueLabel {
            id
            name
          }
        }
      }
    `,
    {
      input: {
        teamId,
        name: LINEAR_LABEL_NAME,
      },
    },
  );

  if (!created.issueLabelCreate.success || !created.issueLabelCreate.issueLabel) {
    throw new Error(`Failed to create Linear label: ${LINEAR_LABEL_NAME}`);
  }

  return created.issueLabelCreate.issueLabel.id;
}

export type PublicLinearIssue = {
  identifier: string;
  title: string;
  url: string | null;
  priority: number;
  state: { name: string; type: string } | null;
  updatedAt: string;
};

export async function createLinearIssue(input: {
  title: string;
  description: string;
  priority: LinearPriority;
}): Promise<{
  identifier: string;
  url: string | null;
  stateName: string | null;
}> {
  const ctx = await resolveContext();

  const created = await linearGraphql<{
    issueCreate: {
      success: boolean;
      issue: {
        identifier: string;
        url: string | null;
        state: { name: string } | null;
      } | null;
    };
  }>(
    /* GraphQL */ `
      mutation IssueCreate($input: IssueCreateInput!) {
        issueCreate(input: $input) {
          success
          issue {
            identifier
            url
            state {
              name
            }
          }
        }
      }
    `,
    {
      input: {
        teamId: ctx.teamId,
        stateId: ctx.backlogStateId,
        title: input.title,
        description: input.description,
        priority: linearPriorityToNumber(input.priority),
        labelIds: [ctx.labelId],
      },
    },
  );

  if (!created.issueCreate.success || !created.issueCreate.issue) {
    throw new Error('Linear issueCreate failed');
  }

  return {
    identifier: created.issueCreate.issue.identifier,
    url: created.issueCreate.issue.url,
    stateName: created.issueCreate.issue.state?.name ?? null,
  };
}

export async function listLabelIssues(options?: { first?: number }): Promise<PublicLinearIssue[]> {
  const ctx = await resolveContext();
  const first = Math.max(1, Math.min(options?.first ?? 50, 100));

  const data = await linearGraphql<{
    issueLabel: {
      id: string;
      name: string;
      issues: { nodes: PublicLinearIssue[] };
    } | null;
  }>(
    /* GraphQL */ `
      query IssuesForLabel($labelId: String!, $first: Int!) {
        issueLabel(id: $labelId) {
          id
          name
          issues(first: $first, orderBy: updatedAt) {
            nodes {
              identifier
              title
              url
              priority
              updatedAt
              state {
                name
                type
              }
            }
          }
        }
      }
    `,
    { labelId: ctx.labelId, first },
  );

  return data.issueLabel?.issues.nodes ?? [];
}


