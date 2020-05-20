import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import { COMMANDS } from 'src/util/Commands';
import Log from 'src/util/Logger';

interface Value {
    name: string;
    value: string;
    level: 'everyone' | 'moderator' | 'admin'
}

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

        let values: Array<Value> = [];
        for (let i of COMMANDS) {
            if (!i.showHelp) continue;

            values.push({
                name: `\`${prefix}${i.name}\``,
                value: i.description,
                level: i.level
            });
        }

        this.message.reply(`I've sent you a list commands via DM. If you haven't got it make sure you have direct messages **enabled**!`);
    
        try {
            /**
             * EVERYONE COMMANDS
             * @everyone
             */

            this.message.author.send({embed: {
                color: 5627270,
                author: {
                    name: `Inferno - Commands (@everyone)`
                },
                thumbnail: {
                    url: null
                },
                fields: values.filter((v: Value) => v.level === 'everyone')
            }});
    
            /**
             * MODERATOR COMMANDS
             * @moderator
             */
            if (modRole && !this.message.member.roles.has(modRole.toString())) {
                if (adminRole && !this.message.member.roles.has(adminRole.toString())) {
                    return;
                } else {
                    return;
                }
            }
            this.message.author.send({embed: {
                color: 2313925,
                author: {
                    name: `Inferno - Moderator Commands`
                },
                thumbnail: {
                    url: null
                },
                fields: values.filter((v: Value) => v.level === 'moderator')
            }});
    
            /**
             * ADMIN COMMANDS
             * @admin
             */
            if (adminRole && !this.message.member.roles.has(adminRole.toString())) { return; }
            this.message.author.send({embed: {
                color: 15819316,
                author: {
                    name: `Inferno - Admin Commands`
                },
                thumbnail: {
                    url: null
                },
                fields: values.filter((v: Value) => v.level === 'admin')
            }});

            this.message.author.send(`You can find out how to use each command by typing \`${this.guild.prefix}command help\` (replace \`command\` with the command name)!`)
        } catch (e) {
            Log('Failed to send some help commands', 'warn');
        }
    }

}
