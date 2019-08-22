import { PluginMiddlewareObject } from './Middleware';
import { Message, Client } from 'discord.js';

const InfernoAdminIds: Array<string> = [
    '308550329216270338'
];

export class IsInfernoAdmin implements PluginMiddlewareObject {
    constructor(private message: Message, private client: Client) {}

    run(): Promise<boolean> {
        return new Promise(async (resolve: Function) => {
            return resolve(InfernoAdminIds.includes(this.message.author.id));
        });
    }
}