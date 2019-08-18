import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import { getFromCache } from 'src/util/Cache';
import { CustomCommand } from 'src/entities/CustomCommand';
import GuildConfig from 'src/util/GuildConfig';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class CustomCommandsCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Custom Commands',
            description: 'List all available custom commands.',
            usage: 'commands',
            category: 'utility'
        }, message, client);
    }

    async run() {
        let response: AxiosResponse<APIResponse<CustomCommand[]>> = await axios.get(process.env.API_URL + 'guild/' + this.message.guild.id + '/commands');
        let commands = response.data.data;
        let config: GuildConfig
        ,   cache = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);

        config = cache ? cache : await this.getGuildConfig();

        if (commands.length == 0) {
            return this.message.channel.send('There are no custom commands. Get started by adding one!');
        }

        this.message.channel.send(`**__Custom Commands__**\n\n` + commands.map((command: CustomCommand) => `\`${config.prefix}${command.trigger}\``).join(' | '));
    }

}
