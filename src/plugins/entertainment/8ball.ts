import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import axios from 'axios';

export class EightBallCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: '8ball',
            description: 'The magic 8 ball! Ask me a question',
            usage: '8ball [question]',
            category: 'entertainment'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please ask a question.'); }

        let responses: Array<string> = [
            'It is certain.',
            'It is undecidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];

        let response = responses[Math.floor(Math.random()*responses.length)];
        this.message.channel.send(`🎱 **${this.args.slice(1).join(' ')}**\n${response}`);
    }

}
