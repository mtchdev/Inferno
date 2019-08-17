import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

export class RemoveCaseCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Remove Case',
            description: 'Remove a case by ID.',
            usage: 'removecase [id]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.message.reply('please enter a case ID.'); }
        let caseId = this.args[1];

        let response: AxiosResponse<any> = await axios.delete(process.env.API_URL + 'case/' + caseId);
        if (response.data && response.data['message'] == 'CASE_NOT_FOUND') {
            return this.message.reply(`couldn't find a case with an ID of **${caseId}**`);
        }

        this.message.channel.send(`Successfully deleted case \`#${caseId}\``);
    }

}
