import { Ignite } from '../IgnitePlugin';
import { Client, Message, Role } from 'discord.js';
import { removeFromCache } from 'src/util/Cache';
import axios from 'axios';
import Log from 'src/util/Logger';

interface Setting {
    trigger: string;
    description: string;
    displayAs?: string;
}

const SETTINGS: Array<Setting> = [
    {
        trigger: '--set-prefix',
        description: 'Change the prefix for the guild.',
        displayAs: '--set-prefix=!'
    },
    {
        trigger: '--set-mod-role',
        description: 'Change the moderator permission role.',
        displayAs: '--set-mod-role @Moderator'
    },
    {
        trigger: '--set-mod-role',
        description: 'Change the admin permission role.',
        displayAs: '--set-admin-role @Admin'
    }
];

export class SettingsCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Settings',
            description: 'Edit the settings for this guild. Run `#prefix#settings list` for a list of actions',
            usage: 'settings [--option(s)]',
            category: 'admin'
        }, message, client);
    }

    async run() {
        if (this.args.length == 1) {
            return this.error('Please specify a setting (or settings) to change. Run `settings list` for a list of actions.');
        }

        if (this.args[1] == 'list') {
            return this.listActions();
        }

        for (let i in this.args) {
            let x = this.args[i].split('=');

            let isValid = SETTINGS.findIndex((setting: Setting) => setting.trigger === x[0]);
            if (isValid >= 0) {
                switch (SETTINGS[isValid].trigger) {
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

    listActions(): void {
        let attributes: Array<String> = [];

        for (let i in SETTINGS) {
            let x = SETTINGS[i];
            attributes.push(`\`${x.displayAs}\` - ${x.description}`);
        }

        this.message.channel.send({embed: {
            color: 16553987,
            description: 'All settings can be changed with the **Admin Role**. You can combine these settings in the same command.',
            author: {
                name: `Settings`
            },
            fields: [
                {
                    name: 'Attributes',
                    value: attributes.join('\n'),
                }
            ]
        }});
    }

}
