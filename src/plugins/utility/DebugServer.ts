import { Inferno } from '../InfernoPlugin';
import { Client, Message, Channel } from 'discord.js';
import { http } from 'src/services/HTTPService';
import { Guild } from 'src/entities/Guild';
import moment from 'moment';

export class DebugServerCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Debug Server',
            description: 'Receive guild information in DM',
            usage: 'debugserver',
            category: 'utility'
        }, message, client);
    }

    async run() {
        let response = await http.get<Guild>('guildinfo/' + this.message.guild.id);
        let data = response.data;

        this.message.author.send(`[**CONFIG: ${this.message.guild.name}**]\n*Joined on ${moment.unix(data.unix_added).format('DD/MM/YYYY')}*\n\nPrefix: \`${this.guild.prefix}\`\nMod Role: \`${this.guild.mod_role}\`\nAdmin Role: \`${this.guild.admin_role}\`\nMute Role: \`${this.guild.mute_role}\`\nOwner ID: \`${data.owner_id}\`\nGuild ID: \`${data.guild_id}\`\nBot ID: \`${data.id}\``);
    }
}
