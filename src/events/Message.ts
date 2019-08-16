import { Message } from "discord.js";
import { plugins } from 'src/Plugins';
import Log from 'src/util/Logger';

export class MessageHandler {
    public prefix: string;
    private command: string;

    constructor(public message: Message) {
        this.handle();
    }

    private handle() {
        this.prefix = ';';

        if (!this.message.content.startsWith(this.prefix)) { return; }
        if (this.message.author.bot) { return; }

        let args = this.message.content.split(' ');
        this.command = args.shift().slice(this.prefix.length).toLowerCase();

        this.routeCommands();
    }

    private routeCommands() {
        for (let i in plugins) {
            let x = plugins[i];
            
            if (this.command == x.trigger) {
                Log(`Command ${this.prefix}${x.trigger} executed by ${this.message.author.username}#${this.message.author.discriminator}`);
                new x.component(this.message.client, this.message);
            }
        }
    }
}
