'use client';

import { LinearWorkflowState, PublicLinearIssue } from '@/lib/linear-shared';
import { IssueCard } from './IssueCard';
import { useState } from 'react';
import { SidePanel } from '@/components/ui/SidePanel';
import { IssueDetails } from './IssueDetails';
import { Search, Monitor, Smartphone, Bug, Lightbulb, Grid } from 'lucide-react';

interface KanbanBoardProps {
    issues: PublicLinearIssue[];
    workflowStates: LinearWorkflowState[];
}

export function KanbanBoard({ issues, workflowStates }: KanbanBoardProps) {
    const [selectedIssue, setSelectedIssue] = useState<PublicLinearIssue | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPlatform, setFilterPlatform] = useState<'all' | 'web' | 'app'>('all');
    const [filterType, setFilterType] = useState<'all' | 'bug' | 'feature'>('all');

    // Filter issues first
    const filteredIssues = issues.filter(issue => {
        // Search Filter (Title & Description)
        const matchesSearch = searchQuery === '' ||
            issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (issue.description || '').toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Platform Filter
        if (filterPlatform === 'web' && !issue.labels?.some(l => l.name === 'Schedulr Web')) return false;
        if (filterPlatform === 'app' && !issue.labels?.some(l => l.name === 'Schedulr App')) return false;

        // Type Filter ('Bug' vs 'Feature' - note labels are usually capitalized in logic but check name)
        const isBug = issue.labels?.some(l => l.name.toLowerCase().includes('bug'));
        if (filterType === 'bug' && !isBug) return false;
        if (filterType === 'feature' && isBug) return false;

        return true;
    });

    // Group issues by state
    const issuesByState = workflowStates.reduce((acc, state) => {
        acc[state.name] = filteredIssues
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
        <div className="flex flex-col">
            {/* Filters Toolbar */}
            <div className="px-6 pb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-96">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search issues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    {/* Platform Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
                        <button
                            onClick={() => setFilterPlatform('all')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filterPlatform === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Grid className="w-3.5 h-3.5" /> All
                        </button>
                        <button
                            onClick={() => setFilterPlatform('web')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filterPlatform === 'web' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Monitor className="w-3.5 h-3.5" /> Web
                        </button>
                        <button
                            onClick={() => setFilterPlatform('app')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filterPlatform === 'app' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Smartphone className="w-3.5 h-3.5" /> App
                        </button>
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />

                    {/* Type Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterType === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('bug')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filterType === 'bug' ? 'bg-white text-rose-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Bug className="w-3.5 h-3.5" /> Bug
                        </button>
                        <button
                            onClick={() => setFilterType('feature')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${filterType === 'feature' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Lightbulb className="w-3.5 h-3.5" /> Feat
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory md:snap-none">
                {workflowStates.map((state) => {
                    const stateIssues = issuesByState[state.name] || [];

                    return (
                        <div key={state.id} className="flex-shrink-0 w-[320px] flex flex-col snap-center">
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: state.color || '#e5e7eb' }} />
                                    <h3 className="font-semibold text-gray-900 text-sm tracking-wide">{state.name}</h3>
                                    <span className="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-100 rounded-full">
                                        {stateIssues.length}
                                    </span>
                                </div>
                            </div>

                            <div className="pr-2">
                                <div className="space-y-3">
                                    {stateIssues.map(issue => (
                                        <div key={issue.identifier} onClick={() => setSelectedIssue(issue)}>
                                            <IssueCard issue={issue} onClick={() => setSelectedIssue(issue)} />
                                        </div>
                                    ))}
                                    {stateIssues.length === 0 && (
                                        <div className="h-32 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-sm text-gray-400 bg-gray-50/50">
                                            No {searchQuery ? 'matching ' : ''}issues
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <SidePanel
                    isOpen={!!selectedIssue}
                    onClose={() => setSelectedIssue(null)}
                    title="Issue Details"
                >
                    {selectedIssue && <IssueDetails issue={selectedIssue} />}
                </SidePanel>
            </div>
        </div>
    );
}
