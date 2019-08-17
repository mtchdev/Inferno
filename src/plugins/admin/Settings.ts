import { Ignite } from '../IgnitePlugin';
import { Client, Message, Role } from 'discord.js';
import { removeFromCache } from 'src/util/Cache';
import axios from 'axios';
import Log from 'src/util/Logger';

const SETTINGS: Array<string> = [
    '--set-prefix',
    '--set-mod-role',
    '--set-admin-role'
];

export class SettingsCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Settings',
            description: 'Edit the settings for this guild',
            usage: 'settings [--option(s)]',
            category: 'admin'
        }, message, client);
    }

    async run() {
        if (this.args.length == 1) {
            return this.error('Please specify a setting (or settings) to change. Run `settings help` for a list of actions.');
        }

        for (let i in this.args) {
            let x = this.args[i].split('=');

            let isValid = SETTINGS.findIndex((setting: string) => setting === x[0]);
            if (isValid >= 0) {
                switch (SETTINGS[isValid]) {
                    case '--set-prefix':
                        try {
                            await axios.post(process.env.API_URL + 'guild/prefix', {guild_id: this.message.guild.id, prefix: x[1]});
                            removeFromCache(`config::${this.message.guild.id}`);
                        } catch (e) {
                            this.message.reply('An unexpected error occurred while changing the prefix.');
                            Log('Failed to set new prefix.', 'error');
                            console.log(e);
                        }

                        break;

                    case '--set-mod-role':
                        let inputModRole: string = this.args[this.args.indexOf('--set-mod-role') + 1];
                        let actualModRole: Role = this.message.mentions.roles.find((role: Role) => role.toString() === inputModRole);
                        try {
                            await axios.post(process.env.API_URL + `guild/${this.message.guild.id}/roles/mod`, {modrole: actualModRole.id});
                            removeFromCache(`config::${this.message.guild.id}`);
                        } catch (e) {
                            this.message.reply('An unexpected error occurred while setting a moderator role.');
                            Log('Failed to set mod role.', 'error');
                            console.log(e); 
                        }
                        break;

                    case '--set-admin-role':
                        let inputAdminRole: string = this.args[this.args.indexOf('--set-admin-role') + 1];
                        let actualAdminRole: Role = this.message.mentions.roles.find((role: Role) => role.toString() === inputAdminRole);
                        try {
                            await axios.post(process.env.API_URL + `guild/${this.message.guild.id}/roles/admin`, {adminrole: actualAdminRole.id});
                            removeFromCache(`config::${this.message.guild.id}`);
                        } catch (e) {
                            this.message.reply('An unexpected error occurred while setting an admin role.');
                            Log('Failed to set admin role.', 'error');
                            console.log(e); 
                        }
                        break;
                }
            }

            if (Number(i) == this.args.length - 1) {
                this.success('Settings saved.', 3.5);
            }
        }
    }

}
