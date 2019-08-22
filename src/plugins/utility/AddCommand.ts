import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import { removeFromCache } from 'src/util/Cache';
import { CustomCommand } from 'src/entities/CustomCommand';
import { plugins, Plugin } from 'src/Plugins';
import axios, { AxiosResponse } from 'axios';

export class AddCommandCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Add Custom Command',
            description: 'Add a custom command',
            usage: 'addcommand [trigger] [response]',
            category: 'utility'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please enter a trigger word.'); }
        if (!this.args[2]) { return this.error('Please enter a response.'); }

        if (!this.args[1].match(/^[a-zA-Z]/g)) {
            return this.error('The command must only contain letters.');
        }

        if (plugins.some((plugin: Plugin) => plugin.trigger === this.args[1])) {
            return this.error('That command is reserved by Ignite.');
        }

        let response = this.args.slice(2).join(' ');
        let command: CustomCommand = {
            trigger: this.args[1].toLowerCase(),
            response: response
        };

        let res: AxiosResponse<any> = await axios.post(process.env.API_URL + 'guild/' + this.message.guild.id + '/command', command);
        if (res.data['message'] && res.data['message'] == 'COMMAND_EXISTS') {
            return this.error('That command already exists.')
        }
        removeFromCache(`commands::${this.message.guild.id}`);

        this.success(`Successfully added custom command.`);
    }

}
