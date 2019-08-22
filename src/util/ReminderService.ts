import { Reminder } from 'src/entities/Reminder';
import { GuildChannel, Client, Channel, TextChannel } from 'discord.js';
import { instance } from './Instance';
import Log from '../../api/vendor/astro/util/Logger';

const client: Client = instance['APP'];

export abstract class ReminderService {
    public static Reminders: Array<Reminder> = [];

    public static init(): void {
        setInterval(() => {
            for (let i in this.Reminders) {
                let x = this.Reminders[i];
                let now = Date.now() / 1000;

                if (now > x.time) {
                    this.sendReminder(x);
                }
            }
        }, 5000);
    }

    private static async sendReminder(reminder: Reminder) {
        try {
            reminder.channel.send(`**Reminder**: ${reminder.user} ${reminder.message}`);
            this.Reminders.splice(this.Reminders.findIndex((r: Reminder) => r.time === reminder.time && r.channel.id === reminder.channel.id && r.user.id === reminder.user.id));
        } catch (e) {
            Log('Failed to send reminder.', 'warn');
            this.Reminders.splice(this.Reminders.findIndex((r: Reminder) => r.time === reminder.time && r.channel.id === reminder.channel.id && r.user.id === reminder.user.id));
        }
    }
}
