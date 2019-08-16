import { Ignite } from './IgnitePlugin';
import { Client, Message } from 'discord.js';

export class TestCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Test',
            description: 'A test command!',
            usage: 'test'
        }, message, client);
    }

    run() {
        this.message.reply('Hey!');
    }

}
