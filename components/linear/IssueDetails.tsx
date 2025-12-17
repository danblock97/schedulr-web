'use client';

import { PublicLinearIssue } from '@/lib/linear-shared';
import { PriorityIcon } from './PriorityIcon';
import { Calendar, User, Tag, Laptop, Smartphone, Bug, Lightbulb } from 'lucide-react';

interface IssueDetailsProps {
    issue: PublicLinearIssue;
}

export function IssueDetails({ issue }: IssueDetailsProps) {
    const isBug = issue.labels?.some(l => l.name.toLowerCase().includes('bug'));
    const isWeb = issue.labels?.some(l => l.name === 'Schedulr Web');
    const isApp = issue.labels?.some(l => l.name === 'Schedulr App');

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {issue.identifier}
                    </span>
                    <div className="flex gap-2">
                        {/* Type Badge */}
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${isBug
                            ? 'bg-rose-50 text-rose-700 border-rose-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            }`}>
                            {isBug ? <Bug className="w-3.5 h-3.5" /> : <Lightbulb className="w-3.5 h-3.5" />}
                            {isBug ? 'Bug' : 'Feature'}
                        </span>

                        {/* Platform Badges */}
                        {isWeb && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border bg-sky-50 text-sky-700 border-sky-100">
                                <Laptop className="w-3.5 h-3.5" />
                                Web
                            </span>
                        )}
                        {isApp && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border bg-purple-50 text-purple-700 border-purple-100">
                                <Smartphone className="w-3.5 h-3.5" />
                                App
                            </span>
                        )}
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                    {issue.title}
                </h1>

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <PriorityIcon priority={issue.priority} className="w-4 h-4" />
                        <span>priority {issue.priority === 0 ? 'None' : issue.priority}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {issue.assignee ? (
                            <>
                                {issue.assignee.avatarUrl ? (
                                    <img src={issue.assignee.avatarUrl} alt="" className="w-5 h-5 rounded-full" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                                        {issue.assignee.name[0]}
                                    </div>
                                )}
                                <span className="text-gray-700">{issue.assignee.name}</span>
                            </>
                        ) : (
                            <>
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="italic text-gray-400">Unassigned</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full bg-gray-200`} />
                        <span className="text-gray-700 font-medium">{issue.state?.name}</span>
                    </div>

                    <div className="flex items-center gap-2" title="Last updated">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(issue.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
                {issue.description ? (
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base font-normal">
                        {issue.description}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No description provided.</p>
                )}
            </div>

            {/* Tags/Labels List (All Labels) */}
            {issue.labels && issue.labels.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <h3 className="text-sm font-semibold text-gray-900">Labels</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {issue.labels.map(label => (
                            <span key={label.name} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                                {label.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
