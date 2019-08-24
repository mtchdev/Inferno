import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

export class RemoveCaseCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Remove Case',
            description: 'Remove a case by ID',
            usage: 'removecase [id]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please enter a case ID.'); }
        let caseId = this.args[1];

			let response: AxiosResponse<any> = await axios.delete(process.env.API_URL + 'case/' + caseId + '/' + this.message.guild.id);
        if (response.data && response.data['message'] == 'CASE_NOT_FOUND') {
            return this.error(`Couldn't find a case with an ID of **${caseId}**`);
        }

        this.success(`Successfully deleted case \`#${caseId}\``);
    }

}
