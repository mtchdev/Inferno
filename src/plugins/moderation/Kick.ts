import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import Log from 'src/util/Logger';

export class KickCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Kick',
            description: 'Kick a user from the server',
            usage: 'kick @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }
        if (!this.args[2]) { return this.error('Please enter a reason.'); }

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

        let reason: string = this.args.slice(2).join(' ');
        if (user.id == this.message.author.id) { return this.error('You cannot kick yourself!'); }

        let item: Case = {
            type: 'kick',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: reason
        }

        let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);
        try {
            await user.send(`You have been kicked from **${this.message.guild.name}** for ${reason}`);
        } catch (e) {
            Log('Failed to send message to user.', 'warn');
        }

        try {
            await user.kick(reason);
            this.success(`\`[CASE #${response.data.data.id}]\` Kicked ${user} for *${reason}*`);
        } catch (e) {
            this.error('Failed to kick user, are you sure I have sufficient permissions?');
        }
    }

}
