import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Case } from 'app/models/Case';

@Entity('notes')
export class Note extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public case_id: number;
    @Column()
    public author_id: string;
    @Column()
    public content: string;

    @ManyToOne(type => Case, acase => acase.notes)
    public case: Case;

}
