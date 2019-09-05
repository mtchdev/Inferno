import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import axios, { AxiosResponse } from 'axios';
import { http } from 'src/services/HTTPService';

export class RemoveNoteCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

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

        let response = await http.delete('note/' + noteId + '/' + this.message.guild.id);
        if (response && response.message == 'NOTE_NOT_FOUND') {
            return this.error(`Couldn't find a note with an ID of **${noteId}**`);
        }

        this.success(`Successfully deleted note \`#${noteId}\``);
    }

}
