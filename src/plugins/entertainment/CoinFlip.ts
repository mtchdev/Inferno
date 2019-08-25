import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';

type CoinFlipResponse = 'heads' | 'tails';

export class CoinFlipCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Coin Flip',
            description: 'Flip a coin',
            usage: 'coinflip',
            category: 'entertainment'
        }, message, client);
    }

    async run() {
        let responses: Array<CoinFlipResponse> = [
            'heads',
            'tails'
        ];

        let response: CoinFlipResponse = responses[Math.floor(Math.random()*2)];

        this.message.channel.send(`I flipped **${response}**!`);
    }

}
