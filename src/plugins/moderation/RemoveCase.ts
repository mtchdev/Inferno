import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import { http } from 'src/services/HTTPService';

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

        let response = await http.delete('case/' + caseId + '/' + this.message.guild.id);
        if (response.message && response.message == 'CASE_NOT_FOUND') {
            return this.error(`Couldn't find a case with an ID of **${caseId}**`);
        }

        this.success(`Successfully deleted case \`#${caseId}\``);
    }

}
