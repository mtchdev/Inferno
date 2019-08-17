import { Message, GuildChannel } from "discord.js";
import { plugins } from 'src/Plugins';
import Log from 'src/util/Logger';
import GuildConfig from 'src/util/GuildConfig';
import APIResponse from 'src/util/APIResponse';
import axios, { AxiosResponse } from 'axios';

export class MessageHandler {
    public guild: GuildConfig;
    private command: string;

    constructor(public message: Message) {
        this.handle();
    }

    private async handle() {
        this.guild = await this.getGuildConfig();

        if (!this.guild) { return; }
        if (!this.message.content.startsWith(this.guild.prefix)) { return; }
        if (this.message.author.bot) { return; }

        let args = this.message.content.split(' ');
        this.command = args.shift().slice(this.guild.prefix.length).toLowerCase();

        this.routeCommands();
    }

    private routeCommands(): void {
        for (let i in plugins) {
            let x = plugins[i];
            
            if (this.command == x.trigger) {
                Log(`Command ${this.guild.prefix}${x.trigger} executed by ${this.message.author.username}#${this.message.author.discriminator}`);
                new x.component(this.message.client, this.message);
                break;
            }

            if (Number(i) == plugins.length - 1) {
                this.message.reply('command not found.');
            }
        }
    }

    private getGuildConfig(): Promise<GuildConfig> {
        return new Promise((resolve: Function, reject: Function) => {
            axios.get(process.env.API_URL + 'guild/' + this.message.guild.id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                resolve(res.data.data);
            }).catch(e => reject(e));
        });
    }
}
