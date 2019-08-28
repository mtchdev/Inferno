import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Reminder } from 'app/models/Reminder';

export class ReminderController extends Controller {
    
    constructor(data) {
        super(data);
    }

    /**
     * Add a reminder
     * @param request The API request
     * @returns Reminder
     */
    async addReminder(request: Request) {
        let input: any = request.body;

        let reminder = new Reminder();
        reminder.channel_id = input.channel_id;
        reminder.guild_id = input.guild_id;
        reminder.time = input.time;
        reminder.user_id = input.user_id;
        reminder.message = input.message;

        await this.db.save(reminder);
        return this.respondWithSuccess(reminder);
    }

    /**
     * Get all reminders
     * @returns Array<Reminder>
     */
    async getAllReminders() {
        let reminders = await this.db.getRepository(Reminder).createQueryBuilder('reminder').getMany();
        return this.respondWithSuccess(reminders);
    }

    /**
     * Remove a reminder
     * @param request The API request
     */
    async removeReminder(request: Request) {
        let id: string = request.params.id;
        try {
            let reminder: Reminder = await this.db.findOneOrFail(Reminder, id);
            await this.db.getRepository(Reminder).remove(reminder);
        } catch (e) {
            return this.respondWithError();
        }
    }

}
