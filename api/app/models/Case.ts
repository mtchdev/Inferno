import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('cases')
export class Case extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public type: CaseTypes;
    @Column()
    public user_id: string;
    @Column()
    public actor_id: string;
    @Column()
    public reason: string;
    @Column()
    public unix_added: number;
    @Column()
    public unix_updated: number;

}

export type CaseTypes = 'warn' | 'mute' | 'ban' | 'tempban';
