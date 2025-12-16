import { Navbar } from '@/components/layout/Navbar';
import { KanbanBoard } from '@/components/linear/KanbanBoard';
import { getWorkflowStates, listIssues } from '@/lib/linear';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Issues - Schedulr',
    description: 'Track our progress, see what we\'re working on, and check the status of known bugs and feature requests.',
};

export const dynamic = 'force-dynamic';

export default async function IssuesPage() {
    let issues = null;
    let workflowStates = null;
    let loadError: string | null = null;

    try {
        // Fetch issues and workflow states in parallel
        // We fetch bugs and features separately because listIssues uses AND logic for labels
        const [bugs, features, fetchedStates] = await Promise.all([
            listIssues(['Schedulr App', 'Bug'], { first: 50 }),
            listIssues(['Schedulr App', 'Feature'], { first: 50 }),
            getWorkflowStates()
        ]);

        // Merge and deduplicate by identifier
        const allIssues = [...bugs, ...features];
        const uniqueIssues = Array.from(new Map(allIssues.map(item => [item.identifier, item])).values());

        issues = uniqueIssues;
        workflowStates = fetchedStates;
    } catch (err) {
        console.error('Failed to load data for /issues', err);
        loadError = 'Failed to load issues board. Please try again later.';
        if (process.env.NODE_ENV === 'development' && err instanceof Error) {
            loadError = `Issues unavailable (dev): ${err.message}`;
        }
    }

    // Default fallback states if API fails completely or returns empty
    if (!workflowStates || workflowStates.length === 0) {
        workflowStates = [
            { id: '1', name: 'Backlog', type: 'backlog', color: '#e2e8f0', position: 1 },
            { id: '2', name: 'Todo', type: 'unstarted', color: '#e2e8f0', position: 2 },
            { id: '3', name: 'In Progress', type: 'started', color: '#f59e0b', position: 3 },
            { id: '4', name: 'Done', type: 'completed', color: '#10b981', position: 4 },
            { id: '5', name: 'Canceled', type: 'canceled', color: '#9ca3af', position: 5 },
        ];
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            <Navbar />
            <div className="flex-1 flex flex-col min-h-0 pt-40">
                <div className="px-6 md:px-8 mb-6 flex-shrink-0">
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">Public Roadmap</h1>
                    <p className="text-gray-500 mt-2 max-w-2xl">
                        See what we're building, what's coming next, and the status of known issues.
                    </p>

                    {loadError && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm">
                            {loadError}
                        </div>
                    )}
                </div>

                {/* Board Area */}
                <div className="flex-1 overflow-hidden min-h-0">
                    <KanbanBoard issues={issues || []} workflowStates={workflowStates} />
                </div>
            </div>
        </div>
    );
}
