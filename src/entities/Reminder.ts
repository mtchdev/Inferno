import { Channel, User, Guild, TextChannel } from 'discord.js';
export interface Reminder {
    channel: TextChannel,
    user: User,
    guild: Guild,
    message: string,
    time: number
}
