import { Message, GuildChannel } from "discord.js";
import { plugins } from 'src/Plugins';
import Log from 'src/util/Logger';
import GuildConfig from 'src/util/GuildConfig';
import APIResponse from 'src/util/APIResponse';
import axios, { AxiosResponse } from 'axios';
import { getFromCache, addToCache } from 'src/util/Cache';
import { CustomCommand } from 'src/entities/CustomCommand';

export class MessageHandler {
    public guild: GuildConfig;
    private command: string;

    constructor(public message: Message) {
        this.handle();
    }

    private async handle() {
        if (!this.message.guild) { return; }
        if (this.message.author.bot) { return; }

        let cached = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);
        this.guild = cached ? cached : await this.getGuildConfig();

        if (!this.guild) { return; }
        if (!this.message.content.startsWith(this.guild.prefix)) { return; }

        let args = this.message.content.split(' ');
        this.command = args.shift().slice(this.guild.prefix.length).toLowerCase();

        this.routeCommands();
    }

    private async routeCommands() {
        for (let i in plugins) {
            let x = plugins[i];
            
            if (this.command == x.trigger) {
                if (x.canActivate) {
                    let passed: boolean = await new x.canActivate(this.message, this.message.client).run();
    
                    if (!passed) {
                        return this.message.reply('you don\'t have permission to use that command.');
                    }
                }

                Log(`Command ${this.guild.prefix}${x.trigger} executed by ${this.message.author.username}#${this.message.author.discriminator}`);
                new x.component(this.message.client, this.message);
                break;
            }

            if (Number(i) == plugins.length - 1) {
                let isCustom = await this.testCustomCommands(this.command);

                if (!isCustom) {
                    this.message.channel.send({embed: {
                        color: 15158332,
                        title: 'Error',
                        description: `⚠ \`${this.guild.prefix}${this.command}\` is not a command.` 
                    }}).then((msg: Message) => {
                        msg.delete(3500);
                    });
                }
            }
        }
    }

    private getGuildConfig(): Promise<GuildConfig> {
        return new Promise((resolve: Function, reject: Function) => {
            axios.get(process.env.API_URL + 'guild/' + this.message.guild.id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                resolve(res.data.data);
                addToCache(`config::${this.message.guild.id}`, res.data.data, 3600);
            }).catch(e => reject(e));
        });
    }

    private getCustomCommands(): Promise<CustomCommand[]> {
        return new Promise((resolve: Function, reject: Function) => {
            axios.get(process.env.API_URL + 'guild/' + this.message.guild.id + '/commands').then((res: AxiosResponse<APIResponse<CustomCommand[]>>) => {
                resolve(res.data.data);
                addToCache(`commands::${this.message.guild.id}`, res.data.data, 3600);
            });
        });
    }

    private testCustomCommands(trigger: string): Promise<boolean> {
        return new Promise(async (resolve: Function) => {
            let commands: CustomCommand[]
            ,   cache = getFromCache<CustomCommand[]>(`commands::${this.message.guild.id}`);

            commands = cache ? cache : await this.getCustomCommands();

            if (commands.length == 0) {
                resolve(false);
            }

            for (let i in commands) {
                if (commands[i].trigger == trigger) {
                    this.message.channel.send(commands[i].response);
                    resolve(true);
                    break;
                }

                if (Number(i) == commands.length - 1) {
                    resolve(false);
                }
            }
        });
    }
}
