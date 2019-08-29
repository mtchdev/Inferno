import { Mute } from 'src/entities/Mute';
import { Client, TextChannel, GuildMember } from 'discord.js';
import Log from '../../api/vendor/astro/util/Logger';
import APIResponse from './APIResponse';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from './ConfigService';

export abstract class MuteService {
    public static Mutes: Array<Mute> = [];
    private static client: Client;

    public static init(client: Client): void {
        this.client = client;
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
        }, 30 * 1000);
    }

    private static refreshMutes(): Promise<void | any> {
        return new Promise(async (resolve: Function, reject: Function) => {
            try {
                let response: AxiosResponse<APIResponse<Mute[]>> = await axios.get(process.env.API_URL + 'tempmutes');
                let mutes = response.data.data;
    
                this.Mutes = mutes;
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    public static async addMute(item: Mute) {
        try {
            await axios.post<AxiosResponse<APIResponse<Mute>>>(process.env.API_URL + 'tempmute', item);
            this.refreshMutes();
        } catch (e) {
            Log('Failed to add reminder.', 'warn');
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
            Log(e, 'error');
        }
    }

    private static async removeMute(item: Mute) {
        try {
            await axios.delete(process.env.API_URL + 'tempmute/' + item.id);
        } catch (e) {
            Log('Failed to delete mute.', 'error');
        }
    }
}
