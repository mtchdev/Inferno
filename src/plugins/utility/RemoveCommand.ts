import { Inferno } from '../InfernoPlugin';
import { Client, Message } from 'discord.js';
import { removeFromCache } from 'src/util/Cache';
import { CustomCommand } from 'src/entities/CustomCommand';
import { plugins, Plugin } from 'src/Plugins';
import axios, { AxiosResponse } from 'axios';

export class RemoveCommandCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Remove Custom Command',
            description: 'Remove a custom command',
            usage: 'removecommand [name]',
            category: 'utility'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please enter a command name.'); }

        if (plugins.some((plugin: Plugin) => plugin.trigger === this.args[1])) {
            return this.error('That command is reserved by Inferno.');
        }

        let res: AxiosResponse<any> = await axios.delete(process.env.API_URL + 'guild/' + this.message.guild.id + '/command/' + this.args[1].toLowerCase());
        if (res.data['message'] && res.data['message'] == 'COMMAND_NOT_FOUND') {
            return this.error('Command not found.');
        }
        removeFromCache(`commands::${this.message.guild.id}`);

        this.success(`Successfully removed custom command.`);
    }

}
