import { Reminder } from 'src/entities/Reminder';
import { Client, TextChannel } from 'discord.js';
import Log from '../../api/vendor/astro/util/Logger';
import APIResponse from '../util/APIResponse';
import axios, { AxiosResponse } from 'axios';

export abstract class ReminderService {
    public static Reminders: Array<Reminder> = [];
    private static client: Client;

    public static init(client: Client): void {
        this.client = client;
        setInterval(async () => {
            await this.refreshReminders();
            for (let i in this.Reminders) {
                let x = this.Reminders[i];
                let now = Date.now() / 1000;

                if (now > x.time) {
                    this.sendReminder(x);
                }
            }
        }, 45 * 1000);
    }

    private static refreshReminders(): Promise<void | any> {
        return new Promise(async (resolve: Function, reject: Function) => {
            try {
                let response: AxiosResponse<APIResponse<Reminder[]>> = await axios.get(process.env.API_URL + 'reminders');
                let reminders = response.data.data;
    
                this.Reminders = reminders;
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    public static async addReminder(reminder: Reminder) {
        try {
            await axios.post<AxiosResponse<APIResponse<Reminder>>>(process.env.API_URL + 'reminder', reminder);
            this.refreshReminders();
        } catch (e) {
            Log('Failed to add reminder.', 'warn');
        }
    }

    private static async sendReminder(reminder: Reminder) {
        try {
            let user = await this.client.fetchUser(reminder.user_id);
            if (!user) { return Log('User on reminder does not exist.', 'warn'); }
            let channel = this.client.guilds.get(reminder.guild_id).channels.get(reminder.channel_id) as TextChannel;
            if (!channel) { return Log('Failed to send reminder, channel does not exist.', 'warn'); }
            await channel.send(`**Reminder**: ${user} ${reminder.message}`);
            this.removeReminder(reminder);
        } catch (e) {
            Log('Failed to send reminder.', 'warn');
            this.removeReminder(reminder);
        }
    }

    private static async removeReminder(reminder: Reminder) {
        try {
            await axios.delete(process.env.API_URL + 'reminder/' + reminder.id);
        } catch (e) {
            Log('Failed to delete reminder.', 'error');
        }
    }
}
