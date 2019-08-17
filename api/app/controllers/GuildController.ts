import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Guild } from 'app/models/Guild';
import { Config } from 'app/models/Config';

export class GuildController extends Controller {
    
    constructor(data) {
        super(data);
    }

    async addGuild(request: Request) {
        let input: any = request.body;

        let guild = new Guild();
        guild.guild_id = input.id;
        guild.owner_id = input.owner;
        guild.unix_added = guild.generateTime();
        try {
            await this.db.save(guild);
        } catch (e) {
            this.respondWithError(e);
        }

        return this.respondWithSuccess(guild);
    }

    async getConfig(request: Request) {
        let id = request.params.id;
        let config;

        try {
            config = await <Promise<Config>>this.db.findOneOrFail(Config, {where:{guild_id: id}});
        } catch (e) {
            return this.respondWithError(e);
        }

        return this.respondWithSuccess(config);
    }

}
