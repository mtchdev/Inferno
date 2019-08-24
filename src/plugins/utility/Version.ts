import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import { VERSION, RELEASE_DATE } from 'src/util/Instance';

export class VersionCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Version',
            description: 'Get the current live Inferno version',
            usage: 'version',
            category: 'utility'
        }, message, client);
    }

    async run() {
        this.message.channel.send(`Inferno is currently on **v${VERSION}** (${RELEASE_DATE})`);
    }
}
