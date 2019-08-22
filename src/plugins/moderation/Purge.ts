import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import Log from 'src/util/Logger';

export class PurgeCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Purge',
            description: 'Purge (a lot of) messages. You can only purge 100 messages at once',
            usage: 'purge [amount]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please specify an amount of messages to purge.'); }
        let amount = Number.parseInt(this.args[1], 0x0);
        if (isNaN(amount)) { return this.error('Please enter a number.'); }
        if (amount > 99) { return this.error('You can only purge up to 99 messages at once.'); }

        try {
            await this.message.delete();
            await this.message.channel.bulkDelete(amount);
            this.success(`Successfully purged **${amount}** message${amount === 1 ? '' : 's'}!`, 3.5);
        } catch (e) {
            Log(e, 'error');
            return this.error('An error occurred.');
        }
    }

}
