'use client';

import { LinearWorkflowState, PublicLinearIssue } from '@/lib/linear-shared';
import { IssueCard } from './IssueCard';
import { motion } from 'framer-motion';

interface KanbanBoardProps {
    issues: PublicLinearIssue[];
    workflowStates: LinearWorkflowState[];
}

export function KanbanBoard({ issues, workflowStates }: KanbanBoardProps) {
    // Group issues by state
    const issuesByState = workflowStates.reduce((acc, state) => {
        acc[state.name] = issues
            .filter(i => i.state?.name === state.name)
            .sort((a, b) => {
                // Sort by priority (ascending number, so Urgent=1 comes before Low=4)
                // Filter 0 (no priority) to be last
                const pA = a.priority === 0 ? 99 : a.priority;
                const pB = b.priority === 0 ? 99 : b.priority;
                if (pA !== pB) return pA - pB;
                // Then by date (newest first)
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
        return acc;
    }, {} as Record<string, PublicLinearIssue[]>);

    return (
        <div className="flex h-[calc(100vh-140px)] overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory md:snap-none">
            {workflowStates.map((state) => {
                const stateIssues = issuesByState[state.name] || [];

                return (
                    <div key={state.id} className="flex-shrink-0 w-[320px] flex flex-col snap-center h-full">
                        <div className="flex items-center justify-between mb-4 sticky top-0 bg-transparent px-1">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: state.color || '#e5e7eb' }} />
                                <h3 className="font-semibold text-gray-900 text-sm tracking-wide">{state.name}</h3>
                                <span className="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-100 rounded-full">
                                    {stateIssues.length}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 pb-10 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            <div className="space-y-3">
                                {stateIssues.map(issue => (
                                    <IssueCard key={issue.identifier} issue={issue} />
                                ))}
                                {stateIssues.length === 0 && (
                                    <div className="h-32 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-sm text-gray-400 bg-gray-50/50">
                                        No issues
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
