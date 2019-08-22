import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import { COMMANDS, Command } from 'src/util/Commands';

export class HelpCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    private everyoneCommands: Array<string> = [];
    private modCommands: Array<string> = [];
    private adminCommands: Array<string> = [];

    constructor(client: Client, message: Message) {
        super({
            name: 'Help',
            description: 'Get a list of available commands',
            usage: 'help',
            category: 'utility'
        }, message, client);
    }

    async run() {
        let prefix = this.guild.prefix;

        this.message.channel.send({embed: {
            color: 16553987,
            author: {
                name: `Ignite Command Help`
            },
            thumbnail: {
                url: null
            },
            fields: [
                {
                    name: 'Everyone',
                    value: COMMANDS.filter((x: Command) => x.level === 'everyone').map((c: Command) => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'),
                },
                {
                    name: 'Moderator',
                    value: COMMANDS.filter((x: Command) => x.level === 'moderator').map((c: Command) => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'),
                },
                {
                    name: 'Admin',
                    value: COMMANDS.filter((x: Command) => x.level === 'admin').map((c: Command) => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'),
                }
            ]
        }});
    }

}
