import { Message, Client } from "discord.js";
import { getFromCache } from "src/util/Cache";
import GuildConfig from 'src/util/GuildConfig';
import { AxiosResponse } from "axios";
import APIResponse from 'src/util/APIResponse';
import axios from 'axios';

export namespace Ignite {

    type PluginCategories = 'utility' | 'moderation' | 'entertainment' | 'admin';

    interface IgniteCommandUsage {
        name: string;
        description: string;
        usage: string | Array<string>;
        category: PluginCategories;
    }

    export class IgniteCommand {
        public args: Array<string> = [];

        constructor(public usage: IgniteCommandUsage, protected message: Message, protected client: Client) {
            this.args = this.message.content.split(' ').splice(0);
            if (this.args.includes('help')) {
                this.sendHelp();
                return;
            }

            this.run();
        }

        public run() {}

        protected async sendHelp() {
            let config: GuildConfig
            ,   cache = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);

            config = cache ? cache : await this.getGuildConfig();

            if (getFromCache(`config::${this.message.guild.id}`))
            this.message.channel.send({
                "embed": {
                  "description": "Find information for any command using `"+config.prefix+"[command] help`",
                  "color": 16553987,
                  "author": {
                    "name": "Neo Command Help",
                  },
                  "fields": [
                    {
                      "name": "Name",
                      "value": this.usage.name
                    },
                    {
                      "name": "Description",
                      "value": this.usage.description+'.'
                    },
                    {
                      "name": "Usage",
                      "value": '`'+config.prefix+this.usage.usage+'`',
                      "inline": true
                    },
                    {
                      "name": "Category",
                      "value": this.usage.category.charAt(0).toUpperCase() + this.usage.category.substr(1),
                      "inline": true
                    }
                  ]
                }
            });
        }

        private getGuildConfig(): Promise<GuildConfig> {
            return new Promise((resolve: Function, reject: Function) => {
                axios.get(process.env.API_URL + 'guild/' + this.message.guild.id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                    resolve(res.data.data);
                }).catch(e => reject(e));
            });
        }

        protected success(message: string, deleteAfter?: number): void {
            this.message.channel.send({embed: {
                color: 3066993,
                title: 'Success',
                description: `✅ ${message}` 
            }}).then((msg: Message) => {
                if (deleteAfter) {
                    msg.delete(deleteAfter * 1000);
                }
            });
        }

        protected error(message: string): void {
            this.message.channel.send({embed: {
                color: 15158332,
                title: 'Error',
                description: `⚠ ${message}` 
            }}).then((msg: Message) => {
                msg.delete(3500);
            });
        }
    }

    export interface IgnitePlugin {
        run(): void;
    }

}
