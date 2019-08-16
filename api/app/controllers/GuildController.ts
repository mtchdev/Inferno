import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Guild } from 'app/models/Guild';

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

}
