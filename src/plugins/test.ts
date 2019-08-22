import { Inferno } from './InfernoPlugin';
import { Client, Message } from 'discord.js';

export class TestCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Test',
            description: 'A test command',
            usage: 'test',
            category: 'entertainment'
        }, message, client);
    }

    run() {
        this.message.reply('Hey!');
    }

}
