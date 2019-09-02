import { Inferno } from 'src/plugins/InfernoPlugin';
import { Client, Message, GuildMember } from 'discord.js';

export class WhereIsCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Where Is',
            description: 'Find which voice channel a user is hiding in',
            usage: 'whereis @user|userId',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }

        let user: GuildMember = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                user = this.message.guild.members.find((member: GuildMember) => member.id === this.args[1]);
            }
        }
        if (!user) { return this.error('Please @mention a user or type their ID.'); }

        let vc = user.voiceChannel;
        if (!vc) {
            return this.error('User is not in a voice channel.');
        }

        this.message.channel.send(`${user.user.username} is in **${vc.name}**.`);
    }

}
