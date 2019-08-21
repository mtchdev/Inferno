export interface Case {
    type: CaseTypes;
    user_id: string;
    actor_id: string;
    reason?: string;
    id?: number;
    unix_added?: number;
    unix_updated?: number;
}

export interface CasesWithNotes<T> {
    cases: Array<T>;
    notes: number;
}

export type CaseTypes = 'warn' | 'mute' | 'ban' | 'tempban' | 'mute' | 'unmute' | 'unban' | 'kick';
