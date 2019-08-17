import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember, User } from 'discord.js';
import { Case } from 'src/entities/Case';
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
                    return this.message.reply('please enter a valid user ID.');
                }
            }
        }
        if (!user) { return this.message.reply('please @mention a user or type their user ID to see their cases.'); }

        let response: AxiosResponse<APIResponse<Case[]>> = await axios.get(process.env.API_URL + 'cases/' + user.id);
        let cases = response.data.data;

        if (cases.length == 0) {
            return this.message.channel.send(`${user} does not have any cases.`);
        }
        
        let str = '';
        str = `Found ${cases.length} cases for ${user}:\n`;
        for (let i in cases) {
            let x = cases[i];
            let type = x.type.charAt(0).toUpperCase() + x.type.substr(1);
            str += `${moment.unix(x.unix_added).format('MM/DD/YYYY')} | \`[CASE #${x.id}]\` __${type}__: ${x.reason}\n`;

            if (str.length > 1800 || Number(i) == cases.length - 1) {
                await this.message.channel.send(str);
                str = '';
            }
        }

    }

}
