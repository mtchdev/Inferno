import { Inferno } from '../InfernoPlugin';
import { Client, Message, User } from 'discord.js';
import { Case } from 'src/entities/Case';
import { http } from 'src/services/HTTPService';

export class UnbanCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

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
            actor_id: this.message.author.id,
            guild_id: this.message.guild.id
        }

        try {
            await this.message.guild.unban(user);
            let response = await http.post<Case>('case', item);
            this.success(`\`[CASE #${response.data.id}]\` Unbanned **${user.username}#${user.discriminator}**.`);
        } catch (e) {
            this.error('Failed to unban user, are you sure the user is banned?');
        }
    }

}
