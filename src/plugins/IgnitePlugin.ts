import { Message, Client } from "discord.js";

export namespace Ignite {

    interface IgniteCommandUsage {
        name: string;
        description: string;
        usage: string | Array<string>;
    }

    export class IgniteCommand {
        constructor(public usage: IgniteCommandUsage, protected message: Message, protected client: Client) {
            this.run();
        }

        public run() {}
    }

    export interface IgnitePlugin {
        run(): void;
    }

}
