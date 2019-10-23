import { IPluginMiddleware } from './Middleware';
import { Message, Client } from 'discord.js';

const InfernoAdminIds: Array<string> = [
    '308550329216270338',
    '543891397737054212',
    '396487205079482378',
    '408524061325656065'
];

export class IsInfernoAdmin implements IPluginMiddleware {
    constructor(private message: Message, private client: Client) {}

    run(): Promise<boolean> {
        return new Promise(async (resolve) => resolve(InfernoAdminIds.includes(this.message.author.id)));
    }
}
