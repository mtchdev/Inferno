import { Ignite } from '../IgnitePlugin';
import { Client, Message } from 'discord.js';
import { getFromCache, removeFromCache, removeAll } from 'src/util/Cache';

export class ClearCacheCommand extends Ignite.IgniteCommand implements Ignite.IgnitePlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Clear Cache',
            description: 'Clear the cache for a guild or all guilds',
            usage: 'clearcache guildId|*',
            category: 'utility'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) {
            removeFromCache(`config::${this.message.guild.id}`);
            removeFromCache(`commands::${this.message.guild.id}`);
            return this.success(`Successfully cleared cache for **${this.message.guild.name}**.`);
        }
        if (this.args[1] == '*') {
            // clear all
            removeAll();
            this.success('Successfully cleared Ignite cache.');
        } else {
            let cacheId = `config::${this.args[1]}`;
            if (!getFromCache(cacheId)) {
                this.error('Cache entry not found.');
            } else {
                removeFromCache(`config::${this.args[1]}`);
                removeFromCache(`commands::${this.args[1]}`);
                this.success(`Successfully cleared cache for ${this.args[1]}.`);
            }
        }
    }

}
