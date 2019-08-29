import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember } from 'discord.js';

export class NickCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Nickname',
            description: 'Set a new nickname for a user',
            usage: 'nick @user|userId [nickname]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }
        if (!this.args[2]) { return this.error('Please specify a nickname.'); }

        let user: GuildMember = this.message.mentions.members.first();
        let nickname: string = this.args.slice(2).join(' ');
        if (!user) {
            if (this.args[1]) {
                user = this.message.guild.members.find((member: GuildMember) => member.id === this.args[1]);
            }
        }
        if (!user) { return this.error('User not found.'); }

        try {
            await user.setNickname(nickname, `Set by ${this.message.author.username}#${this.message.author.discriminator}`);
            this.success(`Successfully set nickname for ${user}`);
        } catch (e) {
            this.error('An error occurred. Are you sure I have sufficient permissions?');
        }
        
    }

}
