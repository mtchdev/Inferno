import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Command } from 'app/models/Command';

export class CommandController extends Controller {
    
    constructor(data) {
        super(data);
    }

    /**
     * Get all custom commands for a guild
     * @param request The API request
     */
    async getCommands(request: Request) {
        let guildId = request.params.guildId;
        let commands = await this.db.find(Command, {where:{guild_id: guildId}});
        return this.respondWithSuccess(commands);
    }

}

