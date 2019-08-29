import { getFromCache } from './Cache';
import GuildConfig from './GuildConfig';
import axios, { AxiosResponse } from 'axios';
import APIResponse from './APIResponse';

export abstract class ConfigService {
    public static async getById(guildId: string): Promise<GuildConfig> {
        return new Promise(async (resolve: Function, reject: Function) => {
            try {
                let cache = getFromCache<GuildConfig>(`config::${guildId}`);
                cache = cache ? cache : await this.getGuildConfig(guildId);
                resolve(cache);
            } catch (e) {
                reject(e);
            }
        });
    }

    private static getGuildConfig(id: string): Promise<GuildConfig> {
        return new Promise((resolve: Function, reject: Function) => {
            axios.get(process.env.API_URL + 'guild/' + id).then((res: AxiosResponse<APIResponse<GuildConfig>>) => {
                resolve(res.data.data);
            }).catch(e => reject(e));
        });
    }
}
