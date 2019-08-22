import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember, User, Role } from 'discord.js';
import moment from 'moment';

export class UserInfoCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'User Info',
            description: 'Get information for a specific user.',
            usage: 'userinfo @user|userId',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID to see their info.'); }

        let user: GuildMember = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                try {
                    user = await this.message.guild.members.get(this.args[1]);
                } catch (e) {
                    return this.error('User is not in this server, or the ID is invalid.');
                }
            }
        }
        if (!user) { return this.error('User not found.'); }

        this.message.channel.send({embed: {
            color: 16553987,
            author: {
                name: `${user.user.username}#${user.user.discriminator} ${user.hasPermission('ADMINISTRATOR') ? '(Administrator)' : ''}`
            },
            thumbnail: {
                url: user.user.avatarURL || 'https://cdn.discordapp.com/embed/avatars/0.png'
            },
            fields: [
                {
                    name: 'Username',
                    value: `${user.user.username}#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: user.nickname || user.user.username,
                    inline: true
                },
                {
                    name: 'Join Date',
                    value: `${moment(user.joinedAt).format('MM/DD/YYYY')}`,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: user.user.id,
                    inline: true
                },
                {
                    name: `Last Message ${user.lastMessage ? '(' + moment(user.lastMessage.createdTimestamp).fromNow() + ')': ''}`,
                    value: user.lastMessage ? user.lastMessage.content : '*Not found.*'
                },
                {
                    name: `Roles (${user.roles.size})`,
                    value: user.roles.size === 0 ? `*${user.user.username} has no roles.*` : user.roles.map((role: Role) => role.name).join(', ')
                }
            ]
        }});
    }

}
