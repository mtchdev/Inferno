import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import Log from 'api/vendor/astro/util/Logger';

const SUPPORT_INVITE = 'https://discord.gg/HBDS6cH';

export class SupportCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'support',
            description: 'Get the invite link to the support server',
            usage: 'support',
            category: 'utility'
        }, message, client);
    }

    async run() {
        try {
            await this.message.channel.send('**Inferno Support**\n*Join our support server:* ' + SUPPORT_INVITE)
        } catch (e) {
            Log('Failed to send support message.', 'warn');
        }
    }
}
