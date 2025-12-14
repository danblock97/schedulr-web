export type LinearPriority = 'none' | 'urgent' | 'high' | 'medium' | 'low';

export type PublicLinearIssue = {
    identifier: string;
    title: string;
    url: string | null;
    priority: number;
    state: { name: string; type: string } | null;
    updatedAt: string;
};

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
