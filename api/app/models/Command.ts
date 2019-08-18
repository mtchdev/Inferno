import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('guildcommands')
export class Command extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public guild_id: string;
    @Column()
    public trigger: string;
    @Column()
    public response: string;

}
