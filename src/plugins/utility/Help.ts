import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import { COMMANDS, Command } from 'src/util/Commands';

export class HelpCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

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
        let modRole = this.guild.mod_role;
        let adminRole = this.guild.admin_role;

        this.message.channel.send({embed: {
            color: 16553987,
            author: {
                name: `Inferno Command Help`
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
                    name: `Moderator ${!modRole ? '(**Not Configured**)' : ''}`,
                    value: COMMANDS.filter((x: Command) => x.level === 'moderator').map((c: Command) => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'),
                },
                {
                    name: `Admin ${!adminRole ? '(**Not Configured**)' : ''}`,
                    value: COMMANDS.filter((x: Command) => x.level === 'admin').map((c: Command) => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'),
                }
            ]
        }});
    }

}
