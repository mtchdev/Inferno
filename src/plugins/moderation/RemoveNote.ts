import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

export class RemoveNoteCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Remove Note',
            description: 'Remove a note by ID',
            usage: 'removenote [id]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please enter a note ID.'); }
        let noteId = this.args[1];

        let response: AxiosResponse<any> = await axios.delete(process.env.API_URL + 'note/' + noteId);
        if (response.data && response.data['message'] == 'NOTE_NOT_FOUND') {
            return this.error(`Couldn't find a note with an ID of **${noteId}**`);
        }

        this.success(`Successfully deleted note \`#${noteId}\``);
    }

}
