import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class ForceBanCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Ban',
            description: 'Ban a user from the server',
            usage: 'ban @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please specify a user ID to ban.'); }
        if (!this.args[2]) { return this.error('Please enter a reason.'); }

        let user: User;
        try {
            user = await this.client.fetchUser(this.args[1]);
        } catch (e) {
            return this.error('User not found.');
        }

        let reason: string = this.args.slice(2).join(' ');
        if (user.id == this.message.author.id) { return this.error('You cannot ban yourself!'); }
        let bans = await this.message.guild.fetchBans();

        if (bans.has(user.id)) {
            return this.error('User is already banned.');
        }

        let item: Case = {
            type: 'ban',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: reason,
            guild_id: this.message.guild.id
        }

        try {
            await this.message.guild.ban(user);
            let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);
            this.success(`\`[CASE #${response.data.data.id}]\` Force banned ${user} for *${reason}*`);
        } catch (e) {
            this.error('Failed to ban user, are you sure I have sufficient permissions?');
        }
    }

}
