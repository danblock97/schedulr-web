import { NextResponse } from 'next/server';
import { createLinearIssue } from '@/lib/linear';
import { type LinearPriority } from '@/lib/linear-shared';
import { isTurnstileBypassedInDev, verifyTurnstile } from '@/lib/turnstile';

type CreateIssueBody = {
  title?: unknown;
  description?: unknown;
  priority?: unknown;
  turnstileToken?: unknown;
  type?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function normalizePriority(v: unknown): LinearPriority {
  if (typeof v !== 'string') return 'none';
  const p = v.trim().toLowerCase();
  if (p === 'no prio' || p === 'none' || p === 'no priority') return 'none';
  if (p === 'urgent') return 'urgent';
  if (p === 'high') return 'high';
  if (p === 'medium') return 'medium';
  if (p === 'low') return 'low';
  return 'none';
}

export async function POST(req: Request) {
  let body: CreateIssueBody;
  try {
    body = (await req.json()) as CreateIssueBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const title = isNonEmptyString(body.title) ? body.title.trim() : '';
  const description = isNonEmptyString(body.description) ? body.description.trim() : '';
  const priority = normalizePriority(body.priority);
  const turnstileToken = isNonEmptyString(body.turnstileToken) ? body.turnstileToken.trim() : '';
  const type = isNonEmptyString(body.type) ? body.type.trim().toLowerCase() : 'bug';

  if (title.length < 3 || title.length > 120) {
    return NextResponse.json({ error: 'Title must be between 3 and 120 characters' }, { status: 400 });
  }
  if (description.length < 10 || description.length > 10000) {
    return NextResponse.json(
      { error: 'Description must be between 10 and 10,000 characters' },
      { status: 400 },
    );
  }
  if (!turnstileToken && !isTurnstileBypassedInDev()) {
    return NextResponse.json({ error: 'Please complete the spam check' }, { status: 400 });
  }

  const remoteIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const turnstile = await verifyTurnstile(turnstileToken, remoteIp);
  if (!turnstile.success) {
    return NextResponse.json({ error: 'Spam check failed' }, { status: 400 });
  }

  const labels = ['Schedulr App'];
  if (type === 'feature') {
    labels.push('Feature');
  } else {
    // Default to bug
    labels.push('Bug');
  }

  try {
    const issue = await createLinearIssue({ title, description, priority, labels });
    return NextResponse.json({ issue }, { status: 200 });
  } catch (err) {
    // Avoid leaking internal details to the client; keep details server-side.
    console.error('Linear issueCreate failed', err);
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}


