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
        let guildId: string = request.params.guildId;
        let commands: Command[] = await this.db.find(Command, {where:{guild_id: guildId}});
        return this.respondWithSuccess(commands);
    }

    /**
     * Add a custom command
     * @param request The API request
     */
    async addCommand(request: Request) {
        let guildId: string = request.params.guildId;
        let input: any = request.body;

        let exists = await this.db.findOne(Command, {where:{guild_id: guildId, trigger: input.trigger}});
        if (exists) {
            return this.respondWithError('COMMAND_EXISTS');
        }

        let command = new Command();
        command.trigger = input.trigger;
        command.response = input.response;
        command.guild_id = guildId;
        this.db.save(command);

        return this.respondWithSuccess(command);
    }

    /**
     * Remove a custom command
     * @param request The API request
     */
    async removeCommand(request: Request) {
        let params: any = request.params;
        let guildId: string = params.guildId;
        let command: string = params.command;

        let exists = await this.db.findOne(Command, {where:{guild_id: guildId, trigger: command}});
        if (!exists) {
            return this.respondWithError('COMMAND_NOT_FOUND');
        }

        await this.db.getRepository(Command).remove(exists);

        return this.respondWithSuccess();
    }

}
