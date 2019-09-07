import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';
import moment from 'moment';
import { http } from 'src/services/HTTPService';

export class CaseCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Case',
            description: 'Find details about a specific case',
            usage: 'case [id]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please enter a case ID.'); }
        if (isNaN(Number(this.args[1]))) { return this.error('Please enter a valid case ID.'); }

        if (this.args[2]) {
            if (this.args[2] == 'edit') {
                return this.editCase();
            } else if (['del', 'delete', 'remove'].indexOf(this.args[2]) + 1) {
                return this.deleteCase();
            }
        }

        this.getCase();
    }

    
    async getCase() {
        let response = await http.get<Case>('case/' + this.args[1] + '/' + this.message.guild.id);
        if (response && response.message == 'CASE_NOT_FOUND') {
            return this.error(`Couldn't find a case with an ID of **${this.args[1]}**`);
        }

        let obj = response.data;
        let type = obj.type.charAt(0).toUpperCase() + obj.type.substr(1);
        let color;

        switch(obj.type) {
            case "warn":
                color = 15322429;
                break;
            case "ban":
                color = 15945263;
                break;
            case "unban":
                color = 6670643;
                break;
            case "mute":
                color = 3375305;
                break;
            case "unmute":
                color = 3594411;
                break;
            case "kick":
                color = 15302461;
                break;
            case "softban":
                color = 8797666;
                break;
        }

        let user = await this.client.fetchUser(obj.user_id);
        let actor = await this.client.fetchUser(obj.actor_id);

        this.message.channel.send({embed: {
            color: color,
            timestamp: moment.unix(obj.unix_added).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            author: {
                name: `CASE #${obj.id}`
            },
            thumbnail: {
                url: user.avatarURL || 'https://cdn.discordapp.com/embed/avatars/0.png'
            },
            fields: [
                {
                    name: 'Type',
                    value: type,
                    inline: true
                },
                {
                    name: 'User',
                    value: `${user}`,
                    inline: true
                },
                {
                    name: 'Actor',
                    value: `${actor}`,
                    inline: true
                },
                {
                    name: 'Reason',
                    value: obj.reason || '*No reason provided.*'
                }
            ]
        }});
    }

    async editCase() {
        let reason: string = this.args.slice(3).join(' ');
        let caseId = this.args[1];
        
        let response = await http.put('case/' + caseId, {reason: reason, guild_id: this.message.guild.id});
        if (response && response.message == 'CASE_NOT_FOUND') {
            return this.error(`Couldn't find a case with an ID of **${caseId}**`);
        }

        this.success(`Successfully updated reason for case \`#${caseId}\``);
    }

    async deleteCase() {
        let caseId = this.args[1];
        let response = await http.delete('case/' + caseId + '/' + this.message.guild.id);
        if (response && response.message == 'CASE_NOT_FOUND') {
            return this.error(`Couldn't find a case with an ID of **${caseId}**`);
        }

        this.success(`Successfully deleted case \`#${caseId}\``);
    }

}
