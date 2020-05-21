import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';

export class DiceCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Dice Roll',
            description: 'Roll the dice',
            usage: 'rolldice',
            category: 'entertainment'
        }, message, client);
    }

    async run() {
        let responses: Array<number> = [
            1,
            2,
            3,
            4,
            5,
            6
        ];

        let response: number = responses[Math.floor(Math.random()*responses.length)];

        this.message.channel.send(`I rolled a **${response}**!`);
    }

}
