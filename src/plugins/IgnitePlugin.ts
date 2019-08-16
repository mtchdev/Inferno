import { Message, Client } from "discord.js";

export namespace Ignite {

    interface IgniteCommandUsage {
        name: string;
        description: string;
        usage: string | Array<string>;
    }

    export class IgniteCommand {
        public args: Array<string> = [];

        constructor(public usage: IgniteCommandUsage, protected message: Message, protected client: Client) {
            this.args = this.message.content.split(' ').splice(0);
            this.run();
        }

        public run() {}
    }

    export interface IgnitePlugin {
        run(): void;
    }

}
