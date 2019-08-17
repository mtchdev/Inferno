import { Ignite } from './IgnitePlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class WarnCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Warn',
            description: 'Warn a user. Use `--no-message` to disable DMs to the user',
            usage: 'warn @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (this.args.length < 2) { return this.sendHelp(); }

        let user: GuildMember = this.message.mentions.members.first();
        let reason: string = this.args.slice(2).join(' ');

        if (!user) { return this.message.reply('please @mention a user to warn.'); }
        if (!reason) { return this.message.reply('please enter a reason.'); }

        let item: Case = {
            type: 'warn',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: reason
        }

        let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);

        this.message.channel.send(`\`[CASE #${response.data.data.id}]\` Warned ${user} for *${reason}*`);

        if (!this.args.includes('--no-message')) {
            user.send(`You have been warned on **${this.message.guild.name}** for ${reason}`);
        }
    }

}
