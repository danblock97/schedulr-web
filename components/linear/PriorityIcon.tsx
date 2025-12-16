import { LinearPriority } from '@/lib/linear-shared';

interface PriorityIconProps {
    priority: number;
    className?: string;
}

export function PriorityIcon({ priority, className = "w-4 h-4" }: PriorityIconProps) {
    // 0 = None, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low
    switch (priority) {
        case 1: // Urgent
            return (
                <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" fillOpacity="0.2" />
                    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M8 4.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="11.5" r="1" fill="currentColor" />
                </svg>
            );
        case 2: // High
            return (
                <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="10" width="2" height="4" rx="0.5" fill="currentColor" />
                    <rect x="7" y="6" width="2" height="8" rx="0.5" fill="currentColor" />
                    <rect x="11" y="2" width="2" height="12" rx="0.5" fill="currentColor" />
                </svg>
            );
        case 3: // Medium
            return (
                <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="10" width="2" height="4" rx="0.5" fill="currentColor" />
                    <rect x="7" y="6" width="2" height="8" rx="0.5" fill="currentColor" />
                    <rect x="11" y="2" width="2" height="12" rx="0.5" fill="currentColor" fillOpacity="0.3" />
                </svg>
            );
        case 4: // Low
            return (
                <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="10" width="2" height="4" rx="0.5" fill="currentColor" />
                    <rect x="7" y="6" width="2" height="8" rx="0.5" fill="currentColor" fillOpacity="0.3" />
                    <rect x="11" y="2" width="2" height="12" rx="0.5" fill="currentColor" fillOpacity="0.3" />
                </svg>
            );
        case 0: // No priority
        default:
            return (
                <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
    }
}
