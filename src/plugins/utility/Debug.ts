import { Inferno } from '../InfernoPlugin';
import { Client, Message, Channel } from 'discord.js';
import moment from 'moment';
import { VERSION } from 'src/util/Instance';
import os from 'os';
import * as gauge from 'cpu-gauge';

var cpu = gauge.start();

export class DebugCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Debug',
            description: 'Critical information for le owner',
            usage: 'debug',
            category: 'utility'
        }, message, client);
    }

    async run() {
        this.message.channel.send({embed: {
            color: 16553987,
            author: {
                name: this.client.user.username,
                icon_url: this.client.user.avatarURL
            },
            description: `Inferno has been online for ${require('humanize-duration')(Math.floor(process.uptime()) * 1000)}.`,
            fields: [
                {
                    name: 'Server Architecture',
                    value: `${os.platform()} running ${process.version}`,
                    inline: true
                },
                {
                    name: 'Process',
                    value: process.pid,
                    inline: true
                },
                {
                    name: 'Memory Usage',
                    value: Math.round(process.memoryUsage().heapTotal / (1024*1024)).toString() + ' MB',
                    inline: true
                },
                {
                    name: 'CPU Usage',
                    value: Math.round(cpu.usage().percent.toString()) + '%',
                    inline: true
                },
                {
                    name: 'Node Version',
                    value: process.version,
                    inline: true
                },
                {
                    name: 'Production Version',
                    value: 'v'+VERSION,
                    inline: true
                },
                {
                    name: 'Guild Count',
                    value: this.client.guilds.size,
                    inline: true
                },
                {
                    name: 'Client ID',
                    value: this.client.user.id
                }
            ]
        }});
    }
}
