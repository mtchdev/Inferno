import { IPluginMiddleware } from './Middleware';
import { Message, Client } from 'discord.js';

const InfernoAdminIds: Array<string> = [
    '308550329216270338', // mitch#3071
    '376068799121719300', // Luca#6815
    '408524061325656065' //Simon.#0001
];

export class IsInfernoAdmin implements IPluginMiddleware {
    constructor(private message: Message, private client: Client) {}

    run(): Promise<boolean> {
        return new Promise(async (resolve) => resolve(InfernoAdminIds.includes(this.message.author.id)));
    }
}
