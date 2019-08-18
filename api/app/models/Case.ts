import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Note } from './Note';

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

    @OneToMany(type => Note, note => note.case_id)
    public notes: Array<Note>

}

export type CaseTypes = 'warn' | 'mute' | 'ban' | 'tempban';
