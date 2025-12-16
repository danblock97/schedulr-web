import { PublicLinearIssue } from '@/lib/linear-shared';
import { PriorityIcon } from './PriorityIcon';
import { Card } from '@/components/ui/Card';
import { User, Bug, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface IssueCardProps {
    issue: PublicLinearIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
    const isBug = issue.labels?.some(l => l.name.toLowerCase().includes('bug'));

    return (
        <Card hover={true} className="p-4 border border-gray-100 shadow-sm cursor-default hover:shadow-md transition-shadow duration-200 bg-white group h-full flex flex-col">
            <div className="flex justify-between items-start mb-2 gap-2">
                <span className="text-xs font-mono text-gray-400 shrink-0">{issue.identifier}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                    <PriorityIcon priority={issue.priority} className={`w-4 h-4 ${issue.priority === 1 ? 'text-red-500' : issue.priority === 2 ? 'text-orange-500' : 'text-gray-400'}`} />
                    {issue.assignee ? (
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-100" title={issue.assignee.name}>
                            {issue.assignee.avatarUrl ? (
                                <img src={issue.assignee.avatarUrl} alt={issue.assignee.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                                    {issue.assignee.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center ring-1 ring-gray-100">
                            <User className="w-3 h-3 text-gray-300" />
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
                    {issue.title}
                </h4>
                {issue.description && (
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {issue.description}
                    </p>
                )}
            </div>

            <div className="mt-auto pt-3 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-[4px] border ${isBug
                        ? 'bg-rose-50 text-rose-700 border-rose-100'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                    {isBug ? <Bug className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                    {isBug ? 'Bug' : 'Feature'}
                </span>
            </div>
        </Card>
    );
}
