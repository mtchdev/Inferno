import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('notes')
export class Note extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public user_id: string;
    @Column()
    public author_id: string;
    @Column()
    public content: string;
    @Column()
    public unix_added: number;

}
