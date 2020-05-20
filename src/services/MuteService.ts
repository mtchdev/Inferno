import { Mute } from 'src/entities/Mute';
import { Client, GuildMember } from 'discord.js';
import Log from 'src/util/Logger';
import { ConfigService } from './ConfigService';
import { http } from 'src/services/HTTPService';

export abstract class MuteService {
    public static Mutes: Array<Mute> = [];
    private static client: Client;

    public static init(client: Client): void {
        this.client = client;
        this.refreshMutes();
        setInterval(async () => {
            await this.refreshMutes();
            for (let i in this.Mutes) {
                let x = this.Mutes[i];
                let now = Date.now() / 1000;

                if (now > x.time) {
                    this.unmute(x);
                    this.removeMute(x);
                }
            }
        }, 60 * 1000);
        
        Log('Mute service started successfully.');
    }

    private static refreshMutes(): Promise<void | any> {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await http.get<Array<Mute>>('tempmutes');
                let mutes = response.data;
    
                this.Mutes = mutes;
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    public static async addMute(item: Mute) {
        try {
            await http.post<Mute>('tempmute', item);
            this.refreshMutes();
        } catch (e) {
            Log(e, 'warn');
        }
    }

    private static async unmute(item: Mute) {
        try {
            let config = await ConfigService.getById(item.guild_id);
            let user: GuildMember = this.client.guilds.get(item.guild_id).members.get(item.user_id);
            if (!user) { return Log('Failed to unmute user - not found.', 'warn'); }
            if (!user.roles.has(config.mute_role.toString())) { return; }

            await user.removeRole(config.mute_role.toString());
        } catch (e) {
            Log(e, 'warn');
        }
    }

    public static async removeMute(item: Mute) {
        try {
            await http.delete<void>('tempmute/' + item.id);
        } catch (e) {
            Log(e, 'warn');
        }
    }
}
