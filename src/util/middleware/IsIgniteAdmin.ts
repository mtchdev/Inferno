import { PluginMiddlewareObject } from './Middleware';
import { Message, Client } from 'discord.js';

const igniteAdminIds: Array<string> = [
    '308550329216270338'
];

export class IsIgniteAdmin implements PluginMiddlewareObject {
    constructor(private message: Message, private client: Client) {}

    run(): Promise<boolean> {
        return new Promise(async (resolve: Function) => {
            return resolve(igniteAdminIds.includes(this.message.author.id));
        });
    }
}
