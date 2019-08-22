import { Inferno } from '../InfernoPlugin';
import { Client, Message, Channel, User, TextChannel } from 'discord.js';
import timestring from 'timestring';
import moment from 'moment';
import { ReminderService } from 'src/util/ReminderService';

export class RemindCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Add A Reminder',
            description: 'Add a reminder. The user field is optional, and will default to you',
            usage: 'remind [time] #channel @user? [message]',
            category: 'utility'
        }, message, client);
    }

    async run() {
        /**
         * ARGS:
         * 1: time
         * 2: #channel
         * 3: user
         * 4: message.join
         */
        let user: User
        ,   message: string
        ,   time: string
        ,   formattedTime: number;

        if (!this.args[1]) { return this.error('Please provide a time in relative format.'); }
        if (!this.args[2]) { return this.error('Please provide a #channel to remind.'); }
        if (!this.args[3]) { return this.error('Please provide a message.'); }
        if (!this.message.mentions.channels.first()) { return this.error('Please provide a #channel to remind.') }
        if (!this.message.mentions.users.first()) {
            // has no user mentioned
            user = this.message.author;
            message = this.args.slice(3).join(' ');
        } else {
            user = this.message.mentions.users.first();
            message = this.args.slice(4).join(' ');
        }
        time = this.args[1];
        formattedTime = timestring(time);

        if (formattedTime > 2.628E6) { return this.error('The time must be less than 1 month.'); }
        if (formattedTime < 60) { return this.error('The time must be greater than 1 minute.'); }

        ReminderService.Reminders.push({
            user: user,
            message: message,
            time: Math.floor((Date.now() / 1000) + formattedTime),
            channel: this.message.mentions.channels.first(),
            guild: this.message.guild
        });

        this.message.channel.send(`Okay, I'll remind ${user.id === this.message.author.id ? 'you' : user.username} ${moment.unix((Date.now() / 1000) + formattedTime).fromNow()} in ${this.message.mentions.channels.first()}`);
    }

}
