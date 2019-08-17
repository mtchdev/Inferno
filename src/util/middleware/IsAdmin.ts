import { PluginMiddlewareObject } from './Middleware';
import { Message, Client } from 'discord.js';
import GuildConfig from 'src/util/GuildConfig';
import { getFromCache } from 'src/util/Cache';
import APIResponse from 'src/util/APIResponse';
import axios, { AxiosResponse } from 'axios';

export class IsAdmin implements PluginMiddlewareObject {
    constructor(private message: Message, private client: Client) {}

    run(): Promise<boolean> {
        return new Promise(async (resolve: Function) => {
            // Global admin check
            if (this.message.member.hasPermission('ADMINISTRATOR')) { resolve(true); return; }

            let config: GuildConfig
            ,   cache = getFromCache<GuildConfig>(`config::${this.message.guild.id}`);

            config = cache ? cache : await this.getGuildConfig();
            let adminRole = config.admin_role;

            if (!adminRole) { resolve(false); return; }
            if (this.message.member.roles.has(adminRole.toString())) { resolve(true); return; }
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