export interface Case {
    type: CaseTypes;
    user_id: string;
    actor_id: string;
    reason: string;
    id?: number;
}

export type CaseTypes = 'warn' | 'mute' | 'ban' | 'tempban';
