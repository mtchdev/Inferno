import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import { CustomCommand } from 'src/entities/CustomCommand';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class CustomCommandsCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

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
            return this.error('There are no custom commands.');
        }

        this.message.channel.send(`**__Custom Commands__**\n\n` + commands.map((command: CustomCommand) => `\`${this.guild.prefix}${command.trigger}\``).join(' | '));
    }

}
