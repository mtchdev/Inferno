import { Ignite } from '../IgnitePlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import axios, { AxiosResponse } from 'axios';
import APIResponse from 'src/util/APIResponse';

export class CaseCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Case',
            description: 'Find details about a specific case',
            usage: 'case [id]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        
    }

}
