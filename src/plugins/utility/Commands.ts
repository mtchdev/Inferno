import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import { CustomCommand } from 'src/entities/CustomCommand';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class CustomCommandsCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Custom Commands',
            description: 'List all available custom commands',
            usage: 'commands',
            category: 'utility'
        }, message, client);
    }

    async run() {
        let response: AxiosResponse<APIResponse<CustomCommand[]>> = await axios.get(process.env.API_URL + 'guild/' + this.message.guild.id + '/commands');
        let commands = response.data.data;

        if (commands.length == 0) {
            return this.error(`There are no custom commands. Get started with \`${this.guild.prefix}addcommand help\``);
        }

        this.message.channel.send(`**__Custom Commands__**\n\n` + commands.map((command: CustomCommand) => `\`${this.guild.prefix}${command.trigger}\``).join(' | '));
    }

}
