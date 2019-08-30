import { Client, Message, Guild } from "discord.js";
import { MessageHandler } from './Message';
import { GuildCreateHandler } from './GuildCreate';

export default class EventHandler {
    constructor(private client: Client) {
        this.initHandlers();
    }

    private initHandlers() {
        this.client.on('message', (message: Message) => {
            console.log('message');
            new MessageHandler(message);
        });

        this.client.on('guildCreate', (guild: Guild) => {
            new GuildCreateHandler(guild);
        })
    }
}
