import { Inferno } from '../InfernoPlugin';
import { Client, Message, User } from 'discord.js';

export class DirectMessageCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Direct Message',
            description: 'Send a direct message to any user with a mutual server',
            usage: 'dm [userId] [message]',
            category: 'utility'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please provide a user ID to message.'); }
        if (!this.args[2]) { return this.error('Please enter a message.') }

        let user: User
        ,   message: string = this.args.slice(2).join(' ');

        try {
            user = await this.client.fetchUser(this.args[1]);
        } catch (e) {
            return this.error('User not found.');
        }

        try {
            await user.sendMessage(`[**INFERNO STAFF**]\n*Sent by ${this.message.author.username}#${this.message.author.discriminator}*\n\n${message}`);
            this.success(`Successfully sent message to ${user}`);
        } catch (e) {
            this.error('Failed to send message to user, maybe they don\'t have a mutual server?');
        }
    }

}
