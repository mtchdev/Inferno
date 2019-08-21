import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import { Case, CasesWithNotes } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import moment from 'moment';

export class CasesCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Cases',
            description: 'Get all cases for a user.',
            usage: 'cases @user|uid',
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

        let response: AxiosResponse<APIResponse<CasesWithNotes<Case>>> = await axios.get(process.env.API_URL + 'cases/' + user.id);
        let cases = response.data.data.cases;
        let notes = response.data.data.notes;

        if (cases.length == 0 || !(cases instanceof Array)) {
            if (notes && notes > 0) {
                return this.message.channel.send(`${user} does not have any cases, but has **${notes}** note${notes === 1 ? '' : 's'}.`);
            } else {
                return this.error(`${user} does not have any cases.`);
            }
        }
        
        let str = '';
        str = `Found ${cases.length} case${cases.length === 1 ? '' : 's'} for ${user}:\n\n`;
        for (let i in cases) {
            let x = cases[i];
            let type = x.type.charAt(0).toUpperCase() + x.type.substr(1);
            str += `${moment.unix(x.unix_added).format('MM/DD/YYYY')} | \`[CASE #${x.id}]\` __${type}__: ${x.reason || '*No reason provided.*'}\n`;

            if (str.length > 1800 || Number(i) == cases.length - 1) {
                if (notes && notes > 0) {
                    str += `\n${user} has **${notes}** note${notes === 1 ? '' : 's'}.`;
                }
                await this.message.channel.send(str);
                str = '';
            }
        }

    }

}
