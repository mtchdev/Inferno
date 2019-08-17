import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('configs')
export class Config extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public guild_id: number;
    
    // Config columns
    @Column()
    public prefix: string;
    @Column()
    public mod_role: number;
    @Column()
    public admin_role: number;

}
