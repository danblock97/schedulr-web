import { Card } from '@/components/ui/Card';
import { linearPriorityLabel, type PublicLinearIssue } from '@/lib/linear-shared';
import { formatRelativeTime } from '@/lib/utils';

interface IssuesListProps {
    issues: PublicLinearIssue[] | null;
    emptyMessage?: string;
    loadError?: string | null;
}

function statusPillClass(stateType: string | undefined) {
    switch ((stateType || '').toLowerCase()) {
        case 'completed':
            return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        case 'canceled':
            return 'bg-gray-50 text-gray-600 border-gray-100';
        case 'started':
            return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'unstarted':
        default:
            return 'bg-amber-50 text-amber-800 border-amber-100';
    }
}

function priorityPillClass(priority: number) {
    switch (priority) {
        case 1:
            return 'bg-rose-50 text-rose-700 border-rose-100';
        case 2:
            return 'bg-orange-50 text-orange-700 border-orange-100';
        case 3:
            return 'bg-indigo-50 text-indigo-700 border-indigo-100';
        case 4:
            return 'bg-gray-50 text-gray-600 border-gray-100';
        case 0:
        default:
            return 'bg-gray-50 text-gray-600 border-gray-100';
    }
}

export function IssuesList({ issues, emptyMessage = 'No issues found.', loadError }: IssuesListProps) {
    if (loadError) {
        return (
            <Card hover={false} className="border border-gray-100">
                <div className="text-sm text-gray-700">{loadError}</div>
            </Card>
        );
    }

    if (issues && issues.length === 0) {
        return (
            <Card hover={false} className="border border-gray-100">
                <div className="text-sm text-gray-700 text-center py-8">{emptyMessage}</div>
            </Card>
        );
    }

    if (!issues) {
        return null; // Or loading state if needed, but usually server handles this
    }

    return (
        <Card hover={false} className="border border-gray-100 p-0 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-white">
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-xs font-semibold tracking-wide text-gray-500 px-5 py-4 w-[110px]">
                                ID
                            </th>
                            <th className="text-left text-xs font-semibold tracking-wide text-gray-500 px-5 py-4">
                                Title
                            </th>
                            <th className="text-left text-xs font-semibold tracking-wide text-gray-500 px-5 py-4 w-[150px]">
                                Status
                            </th>
                            <th className="text-left text-xs font-semibold tracking-wide text-gray-500 px-5 py-4 w-[150px]">
                                Priority
                            </th>
                            <th className="text-right text-xs font-semibold tracking-wide text-gray-500 px-5 py-4 w-[140px]">
                                Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {issues.map((issue) => {
                            const updated = formatRelativeTime(new Date(issue.updatedAt));
                            const stateName = issue.state?.name ?? 'Unknown';
                            const stateType = issue.state?.type ?? 'unstarted';

                            return (
                                <tr key={issue.identifier} className="border-b border-gray-50 hover:bg-gray-50/60">
                                    <td className="px-5 py-4 align-top">
                                        <span className="text-xs font-semibold text-gray-600">{issue.identifier}</span>
                                    </td>
                                    <td className="px-5 py-4 align-top">
                                        <div className="text-sm font-semibold text-gray-900 leading-snug break-words">
                                            {issue.title}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 align-top">
                                        <span
                                            className={[
                                                'inline-flex text-xs font-semibold px-2 py-1 rounded-full border',
                                                statusPillClass(stateType),
                                            ].join(' ')}
                                        >
                                            {stateName}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 align-top">
                                        <span
                                            className={[
                                                'inline-flex text-xs font-semibold px-2 py-1 rounded-full border',
                                                priorityPillClass(issue.priority),
                                            ].join(' ')}
                                        >
                                            {linearPriorityLabel(issue.priority)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 align-top text-right">
                                        <span className="text-xs text-gray-500">{updated}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
