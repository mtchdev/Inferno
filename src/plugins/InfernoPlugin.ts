import { Message, Client } from "discord.js";
import { getFromCache } from "src/util/Cache";
import GuildConfig from 'src/util/GuildConfig';
import { AxiosResponse } from "axios";
import APIResponse from 'src/util/APIResponse';
import axios from 'axios';

export namespace Inferno {

    type PluginCategories = 'utility' | 'moderation' | 'entertainment' | 'admin';

    interface InfernoCommandUsage {
        name: string;
        description: string;
        usage: string | Array<string>;
        category: PluginCategories;
    }

    export class InfernoCommand {
        public args: Array<string> = [];
        protected guild: GuildConfig;

        constructor(public usage: InfernoCommandUsage, protected message: Message, protected client: Client) {
            this.init();
        }

        private async init() {
            this.args = this.message.content.split(' ').splice(0);
            await this.initConfig();

            if (this.args[1] == ('help')) {
                this.sendHelp();
                return;
            }

            this.run();
        }

        public run() {}

        private async initConfig() {
            let cache = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);
            this.guild = cache ? cache : await this.getGuildConfig();
        }

        private getGuildConfig(): Promise<GuildConfig> {
            return new Promise((resolve: Function, reject: Function) => {
                axios.get(process.env.API_URL + 'guild/' + this.message.guild.id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                    resolve(res.data.data);
                }).catch(e => reject(e));
            });
        }

        protected async sendHelp() {
            let description = this.usage.description.replace(/#prefix#/g, this.guild.prefix);
            this.message.channel.send({
                "embed": {
                  "description": "Find information for any command using `"+this.guild.prefix+"[command] help`",
                  "color": 16553987,
                  "author": {
                    "name": "Inferno Command Help",
                  },
                  "fields": [
                    {
                      "name": "Name",
                      "value": this.usage.name
                    },
                    {
                      "name": "Description",
                      "value": description+'.'
                    },
                    {
                      "name": "Usage",
                      "value": '`'+this.guild.prefix+this.usage.usage+'`',
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

    export interface InfernoPlugin {
        run(): void;
    }

}
