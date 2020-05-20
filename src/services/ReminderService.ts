import { Reminder } from 'src/entities/Reminder';
import { Client, TextChannel } from 'discord.js';
import Log from 'src/util/Logger';
import { http } from 'src/services/HTTPService';

export abstract class ReminderService {
    public static Reminders: Array<Reminder>;
    private static client: Client;

    public static init(client: Client): void {
        this.client = client;
        this.Reminders = [];
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

        Log('Reminder service started successfully.');
    }

    private static refreshReminders(): Promise<Reminder[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await http.get<Reminder[]>('reminders');
                this.Reminders = response.data;
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    public static async addReminder(reminder: Reminder) {
        try {
            let response = await http.post<Reminder>('reminder', reminder);
            this.Reminders.push(response.data);
        } catch (e) {
            Log(e, 'warn');
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
            Log(e, 'warn');
            this.removeReminder(reminder);
        }
    }

    private static async removeReminder(reminder: Reminder) {
        try {
            await http.delete('reminder/' + reminder.id);
        } catch (e) {
            Log(e, 'warn');
        }
    }
}
