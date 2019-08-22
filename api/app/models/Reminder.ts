import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('reminders')
export class Reminder extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public user_id: string;
    @Column()
    public guild_id: string;
    @Column()
    public channel_id: string;
    @Column()
    public unix_remind: number;

}
