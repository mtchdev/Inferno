import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember, Role } from 'discord.js';
import { Case } from 'src/entities/Case';
import { MuteService } from 'src/services/MuteService';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import timestring from 'timestring';
import moment from 'moment';

export class MuteCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Mute',
            description: 'Mute a user. The time field is optional but allows temporary mutes and should be in relative time such as 2h30m',
            usage: 'mute @user|userId [time?] [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.guild.mute_role) { return this.error('A mute role is not set.'); }
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }
        if (!this.args[2]) { return this.error('Please enter a time in relative format (1h1m) [optional] or a reason.'); }

        let user: GuildMember = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                user = await this.message.guild.members.get(this.args[1]);
                if (!user) {
                    return this.error('User doesn\'t exist, or isn\'t in this server.');
                }
            }
        }

        if (user.roles.has(this.guild.mute_role.toString())) { return this.error('User is already muted.'); }

        let formattedTime: number;

        try {
            formattedTime = await timestring(this.args[2]);
        } catch (e) {}

        if (!formattedTime) {
            let reason = this.args.slice(2).join(' ');
        
            let item: Case = {
                type: 'mute',
                user_id: user.id,
                actor_id: this.message.author.id,
                reason: reason,
                guild_id: this.message.guild.id
            }

            this.addCase(item, user);
        } else {
            if (!this.args[3]) { return this.error('Please enter a reason.'); }
            let reason = this.args.slice(3).join(' ');

            let item: Case = {
                type: 'mute',
                user_id: user.id,
                actor_id: this.message.author.id,
                reason: reason,
                guild_id: this.message.guild.id
            }

            this.addCase(item, user, formattedTime);
            MuteService.addMute({
                guild_id: item.guild_id,
                user_id: item.user_id,
                time: Math.floor((Date.now() / 1000) + formattedTime)
            });
        }
    }

    private async addCase(item: Case, user: GuildMember, formattedTime?: number) {
        let role: Role;

        try {
            role = await this.message.guild.roles.get(this.guild.mute_role.toString());
            await user.addRole(role);
        } catch (e) {
            return this.error('Failed to add mute role to user, cancelled operation.');
        }

        let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);
        if (formattedTime) {
            let time = moment.unix((Date.now() / 1000) + formattedTime).fromNow(true);
            user.send(`You have been temporarily muted for ${time} on **${this.message.guild.name}** for ${item.reason}`).catch();
            this.success(`\`[CASE #${response.data.data.id}]\` Temporarily muted ${user} for ${time} for *${item.reason}*`);
        } else {
            user.send(`You have been muted on **${this.message.guild.name}** for ${item.reason}`).catch();
            this.success(`\`[CASE #${response.data.data.id}]\` Muted ${user} for *${item.reason}*`);
        }
    }

}
