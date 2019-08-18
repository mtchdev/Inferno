import { PluginMiddlewareObject } from './Middleware';
import { Message, Client } from 'discord.js';
import GuildConfig from 'src/util/GuildConfig';
import { getFromCache } from 'src/util/Cache';
import APIResponse from 'src/util/APIResponse';
import axios, { AxiosResponse } from 'axios';

export class IsModerator implements PluginMiddlewareObject {
    constructor(private message: Message, private client: Client) {}

    run(): Promise<boolean> {
        return new Promise(async (resolve: Function) => {
            // Global admin check
            if (this.message.member.hasPermission('ADMINISTRATOR')) { resolve(true); return; }

            let config: GuildConfig
            ,   cache = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);

            config = cache ? cache : await this.getGuildConfig();
            let modRole = config.mod_role;

            if (!modRole) { resolve(false); return; }
            return resolve(this.message.member.roles.has(modRole.toString()));
        });
    }

    getGuildConfig(): Promise<GuildConfig> {
        return new Promise((resolve: Function, reject: Function) => {
            axios.get(process.env.API_URL + 'guild/' + this.message.guild.id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                resolve(res.data.data);
            }).catch(e => reject(e));
        });
    }
}