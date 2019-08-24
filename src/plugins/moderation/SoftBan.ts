import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import Log from 'src/util/Logger';

export class SoftBanCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Soft Ban',
            description: 'Equivalent to kicking, soft banning will remove all messages',
            usage: 'softban @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user to softban.'); }
        if (!this.args[2]) { return this.error('Please enter a reason.'); }

        let user: GuildMember = this.message.mentions.members.first();

        if (!user) { return this.error('Please @mention a user to softban.`'); }

        let reason: string = this.args.slice(2).join(' ');
        if (user.id == this.message.author.id) { return this.error('You cannot softban yourself!'); }
        let bans = await this.message.guild.fetchBans();

        let item: Case = {
            type: 'softban',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: reason,
            guild_id: this.message.guild.id
        }

        try {
            if (!user.bannable) { return this.error('You cannot softban that user.'); }
            try {
                await user.send(`You have been kicked from **${this.message.guild.name}** for ${reason}`);
            } catch (e) {}
						await this.message.guild.ban(user);
						await this.message.guild.unban(user);

            let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);
            this.success(`\`[CASE #${response.data.data.id}]\` Softbanned ${user} for *${reason}*`);
        } catch (e) {
            this.error('Failed to softban user, are you sure I have sufficient permissions?');
        }
    }

}
