import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tempmutes')
export class TempMute extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public user_id: string;
    @Column()
    public guild_id: string;
    @Column()
    public time: number;

}
