import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import axios from 'axios';

export class NoteCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Add Note',
            description: 'Add a note to a user',
            usage: 'addnote [@user|userId] [note]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        let user: GuildMember | User = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                try {
                    user = await this.client.fetchUser(this.args[1]);
                } catch (e) {
                    return this.error('please enter a valid user ID.');
                }
            }
        }
        if (!user) { return this.error('please @mention a user or type their user ID to see their cases.'); }

        if (!this.args[2]) { return this.error('Please enter a note.'); }
        let note = this.args.slice(2).join(' ');

        await axios.post(process.env.API_URL + 'note/' + user.id, {author: this.message.author.id, content: note});

        this.success(`Successfully added note to ${user}`);
    }

}
