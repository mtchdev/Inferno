import { Client, Message } from "discord.js";
import { MessageHandler } from './Message';

export default class EventHandler {
    constructor(private client: Client) {
        this.initHandlers();
    }

    private initHandlers() {
        this.client.on('message', (message: Message) => {
            new MessageHandler(message);
        });
    }
}
