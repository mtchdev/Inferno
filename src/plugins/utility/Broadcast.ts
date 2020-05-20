import { Inferno } from '../InfernoPlugin';
import { Client, Message, TextChannel } from 'discord.js';
import { removeFromCache } from 'src/util/Cache';
import { CustomCommand } from 'src/entities/CustomCommand';
import { plugins, Plugin } from 'src/Plugins';
import axios, { AxiosResponse } from 'axios';

export class BroadcastCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Broadcast',
            description: 'Broadcast a message to a channel',
            usage: 'broadcast [#channel] [message]',
            category: 'utility'
        }, message, client);
    }

    async run() {
        /**
         * ARGS:
         * 1: channel
         * 2: message
         */
        let message: string
        , channel: TextChannel;

        if (!this.args[1]) { return this.error('Please specify a channel.'); }
        if (!this.args[2]) { return this.error('Please enter a message.'); }
        if (!this.message.mentions.channels.first()) { return this.error('Please specify a channel.'); }

        message = this.args.slice(2).join(' ');
        channel = this.message.mentions.channels.first();

        try {
            await channel.send(`[**BROADCAST**]\n\n${message}`);
            this.success(`Successfully sent a message to ${channel}.`);
        } catch (e) {
            this.error('Failed to send message. Are you sure I have permission?');
        }
    }

}
