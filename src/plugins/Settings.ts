import { Ignite } from './IgnitePlugin';
import { Client, Message } from 'discord.js';

const SETTINGS: Array<string> = [
    '--set-prefix'
];

export class SettingsCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Settings',
            description: 'Edit the settings for this guild.',
            usage: 'settings [--option(s)]'
        }, message, client);
    }

    run() {
        for (let i in this.args) {
            let x = this.args[i].split('=');

            let isValid = SETTINGS.findIndex((setting: string) => setting === x[0]);
            if (isValid >= 0) {
                switch (SETTINGS[isValid]) {
                    case '--set-prefix':
                        this.message.channel.send(`Prefix set to \`${x[1]}\``);
                        break;
                }
            }
        }
    }

}
