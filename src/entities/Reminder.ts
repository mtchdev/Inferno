import { Channel, User, Guild, TextChannel } from 'discord.js';
export interface Reminder {
    channel_id: string,
    user_id: string,
    guild_id: string,
    message: string,
    time: number,
    id: number
}
