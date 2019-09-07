import { Inferno } from 'src/plugins/InfernoPlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import Log from 'src/util/Logger';
import { http } from 'src/services/HTTPService';

export class WarnCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Warn',
            description: 'Warn a user. Use `--no-message` to disable DMs to the user',
            usage: 'warn @user [reason]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }
        if (!this.args[2]) { return this.error('Please enter a reason.'); }

        let user: GuildMember = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                user = this.message.guild.members.get(this.args[1]);
                if (!user) {
                    return this.error('User doesn\'t exist, or isn\'t in this server.');
                }
            }
        }
        if (user.id == this.message.author.id) { return this.error('You cannot warn yourself!'); }

        let reason: string = this.args.slice(2).join(' ');
        let item: Case = {
            type: 'warn',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: reason,
            guild_id: this.message.guild.id
        }

        try {
            let response = await http.post<Case>('case', item);
            this.success(`\`[CASE #${response.data.id}]\` Warned ${user} for *${reason}*`);
        } catch (e) {
            this.debug(e);
            return this.error('Failed to create case.');
        }

        try {
            user.send(`You have been warned on **${this.message.guild.name}** for ${reason}`);
        } catch (e) {
            this.debug(e);
            return Log('Failed to send message to user.', 'warn');
        }
    }

}
