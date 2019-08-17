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
        guild.unix_added = Date.now() / 1000;

        // Create config
        let config = new Config();
        config.guild_id = guild.guild_id;
        config.prefix = ';';

        try {
            await this.db.save([guild, config]);
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

    async setPrefix(request: Request) {
        let input: any = request.body;

        try {
            let config = await this.db.findOneOrFail(Config, {where:{guild_id: input.guild_id}});
            config.prefix = input.prefix;
            this.db.save(config);

            return this.respondWithSuccess(config);
        } catch (e) {
            return this.respondWithError(e);
        }
    }

}
