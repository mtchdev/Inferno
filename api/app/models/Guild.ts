import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('guilds')
export class Guild extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public guild_id: number;
    @Column()
    public owner_id: number;
    @Column()
    public unix_added: number;

    generateTime(): number {
        return Date.now();
    }

}
