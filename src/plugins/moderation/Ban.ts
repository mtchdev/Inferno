import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import Log from 'src/util/Logger';

export class BanCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Ban',
            description: 'Ban a user from the server',
            usage: 'ban @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (this.args.length < 2) { return this.sendHelp(); }

        let user: GuildMember = this.message.mentions.members.first();
        let reason: string = this.args.slice(2).join(' ');

        if (!user) { return this.error('Please @mention a user to ban.'); }
        if (!reason) { return this.error('Please enter a reason.'); }
        if (user.id == this.message.author.id) { return this.error('You cannot ban yourself!'); }

        let item: Case = {
            type: 'ban',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: reason
        }

        let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);
        try {
            await user.send(`You have been banned from **${this.message.guild.name}** for ${reason}`);
        } catch (e) {
            Log('Failed to send message to user.', 'warn');
        }

        try {
            await user.ban(reason);
            this.success(`\`[CASE #${response.data.data.id}]\` Banned ${user} for *${reason}*`);
        } catch (e) {
            this.error('Failed to ban user, are you sure I have sufficient permissions?');
        }
    }

}
