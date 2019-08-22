import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import { Note } from 'src/entities/Note';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import moment from 'moment';

export class NotesCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Notes',
            description: 'Get all notes for a user',
            usage: 'notes @user|uid',
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
                    return this.error('Please enter a valid user ID.');
                }
            }
        }
        if (!user) { return this.error('Please @mention a user or type their user ID to see their cases.'); }

        let response: AxiosResponse<APIResponse<Note[]>> = await axios.get(process.env.API_URL + 'notes/' + user.id);
        let notes = response.data.data;

        if (notes.length == 0) {
            return this.error(`${user} does not have any notes.`);
        }
        
        let str = '';
        str = `Found ${notes.length} note${notes.length === 1 ? '' : 's'} for ${user}:\n\n`;
        for (let i in notes) {
            let x = notes[i];
            let author;

            try {
                author = await this.client.fetchUser(x.author_id);
            } catch (e) {
                str += `${moment.unix(x.unix_added).format('MM/DD/YYYY')} | *An unexpected error occurred while trying to load this note.`;
                continue;
            }

            str += `${moment.unix(x.unix_added).format('MM/DD/YYYY')} | \`[#${x.id}]\` **${author.username}#${author.discriminator}**: ${x.content}\n`;

            if (str.length > 1800 || Number(i) == notes.length - 1) {
                await this.message.channel.send(str);
                str = '';
            }
        }

    }

}
