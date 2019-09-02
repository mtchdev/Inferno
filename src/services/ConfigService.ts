import { getFromCache } from 'src/util/Cache';
import GuildConfig from 'src/util/GuildConfig';
import { http } from 'src/services/HTTPService';

export abstract class ConfigService {
    public static async getById(guildId: string): Promise<GuildConfig> {
        return new Promise(async (resolve, reject) => {
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
        return new Promise(async (resolve, reject) => {
            try {
                let response = await http.get<GuildConfig>('guild/' + id);
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }
}
