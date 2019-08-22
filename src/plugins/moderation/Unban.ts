import { Ignite } from '../IgnitePlugin';
import { Client, Message, User } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class UnbanCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Unban',
            description: 'Unban a user from the server',
            usage: 'unban [userId]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please enter a user ID to unban'); }
        let user: User;

        try {
            user = await this.client.fetchUser(this.args[1]);
        } catch (e) {
            return this.error('User not found.');
        }

        let item: Case = {
            type: 'unban',
            user_id: user.id,
            actor_id: this.message.author.id
        }

        try {
            await this.message.guild.unban(user);
            let response: AxiosResponse<APIResponse<Case>> = await axios.post(process.env.API_URL + 'case', item);
            this.success(`\`[CASE #${response.data.data.id}]\` Unbanned **${user.username}#${user.discriminator}**.`);
        } catch (e) {
            this.error('Failed to unban user, are you sure the user is banned?');
        }
    }

}