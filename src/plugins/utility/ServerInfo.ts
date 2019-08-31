import { Inferno } from '../InfernoPlugin';
import { Client, Message, Channel } from 'discord.js';
import moment from 'moment';
import ColorThief from 'color-thief';
import http from 'https';
import { createWriteStream } from 'fs';
import { GuildIconService } from 'src/services/GuildIconService';

export class ServerInfoCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Server Info',
            description: 'Get information for the server',
            usage: 'serverinfo',
            category: 'utility'
        }, message, client);
    }

    async run() {
        const guild = this.message.guild;
        let icon = await GuildIconService.getIcon(guild);
        let thief: Array<number> = new ColorThief().getColor(icon);
        let rgb = '#' + (0x1000000 + (thief[2] | (thief[1] << 8) | (thief[0] << 16))).toString(16).slice(1);
        let color = Number.parseInt(rgb.replace('#', ''), 16);

        this.message.channel.send({embed: {
            color: color || 16553987,
            author: {
                name: guild.name
            },
            thumbnail: {
                url: guild.iconURL
            },
            description: `${guild.owner.user.username} created this server ${moment(guild.createdAt).fromNow()}.`,
            fields: [
                {
                    name: 'Guild ID',
                    value: guild.id,
                    inline: true
                },
                {
                    name: 'Owner',
                    value: `${guild.owner.user.username}#${guild.owner.user.discriminator}`,
                    inline: true
                },
                {
                    name: 'Members',
                    value: guild.memberCount,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: guild.roles.size,
                    inline: true
                },
                {
                    name: 'Text Channels',
                    value: guild.channels.filter((channel: Channel) => channel.type === 'text').size,
                    inline: true
                },
                {
                    name: 'Voice Channels',
                    value: guild.channels.filter((channel: Channel) => channel.type === 'voice').size,
                    inline: true
                },
                {
                    name: 'Server Region',
                    value: guild.region.charAt(0).toUpperCase() + guild.region.substr(1),
                    inline: true
                },
                {
                    name: 'Created',
                    value: moment(guild.createdAt).format('MM/DD/YYYY'),
                    inline: true
                },
                {
                    name: 'Guild Features',
                    value: guild.features.join('\n') || 'NONE',
                    inline: true
                },
                {
                    name: 'Inferno Prefix',
                    value: `\`${this.guild.prefix}\``,
                    inline: true
                }
            ]
        }});
    }
}
