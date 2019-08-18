import { Ignite } from '../IgnitePlugin';
import { Client, Message, Channel } from 'discord.js';
import moment from 'moment';
import GuildConfig from 'src/util/GuildConfig';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import { getFromCache } from 'src/util/Cache';

export class ServerInfoCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Server Info',
            description: 'Get information for the server',
            usage: 'serverinfo',
            category: 'utility'
        }, message, client);
    }

    async run() {
        let config: GuildConfig
        ,   cache = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);

        config = cache ? cache : await this.getConfig();
        const guild = this.message.guild;
        this.message.channel.send({embed: {
            color: 16553987,
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
                    name: 'Ignite Prefix',
                    value: `\`${config.prefix}\``,
                    inline: true
                }
            ]
        }});
    }

    private getConfig(): Promise<GuildConfig> {
        return new Promise((resolve: Function, reject: Function) => {
            axios.get(process.env.API_URL + 'guild/' + this.message.guild.id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                resolve(res.data.data);
            }).catch(e => reject(e));
        });
    }
}
