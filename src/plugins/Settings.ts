import { Ignite } from './IgnitePlugin';
import { Client, Message } from 'discord.js';
import { removeFromCache } from 'src/util/Cache';
import axios from 'axios';
import Log from 'src/util/Logger';

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

    async run() {
        for (let i in this.args) {
            let x = this.args[i].split('=');

            let isValid = SETTINGS.findIndex((setting: string) => setting === x[0]);
            if (isValid >= 0) {
                switch (SETTINGS[isValid]) {
                    case '--set-prefix':
                        try {
                            await axios.post(process.env.API_URL + 'guild/prefix', {guild_id: this.message.guild.id, prefix: x[1]});
                            removeFromCache(`config::${this.message.guild.id}`);
                            this.message.channel.send(`Successfully changed prefix to \`${x[1]}\``);
                        } catch (e) {
                            this.message.reply('An unexpected error occurred.');
                            Log('Failed to set new prefix.', 'error');
                            console.log(e);
                        }

                        break;
                }
            }
        }
    }

}
