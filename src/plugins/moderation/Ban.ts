import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import { http } from 'src/services/HTTPService';

export class BanCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Ban',
            description: 'Ban a user from the server',
            usage: 'ban @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }
        if (!this.args[2]) { return this.error('Please enter a reason.'); }

        let user: GuildMember = this.message.mentions.members.first();

        if (!user) { return this.error('Please @mention a user to ban. If you wan\'t to ban via **user ID** please use `'+this.guild.prefix+'forceban`'); }

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
            if (!user.bannable) { return this.error('You cannot ban that user.'); }
            try {
                await user.send(`You have been banned from **${this.message.guild.name}** for ${reason}`);
            } catch (e) {}
            await this.message.guild.ban(user);

            let response = await http.post<Case>('case', item);
            this.success(`\`[CASE #${response.data.id}]\` Banned ${user} for *${reason}*`);
        } catch (e) {
            this.error('Failed to ban user, are you sure I have sufficient permissions?');
        }
    }

}
