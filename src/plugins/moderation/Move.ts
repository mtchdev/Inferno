import { Inferno } from '../InfernoPlugin';
import { Client, Message, GuildMember, GuildChannel, VoiceChannel } from 'discord.js';

export class MoveCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Move',
            description: 'Move a user into a different voice channel',
            usage: 'move @user|userId [channelName]',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }
        if (!this.args[2]) { return this.error('Please specify a voice channel.'); }

        let channelName: string = this.args.slice(2).join(' ');
        let user: GuildMember = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                user = this.message.guild.members.find((member: GuildMember) => member.id === this.args[1]);
            }
        }
        if (!user) { return this.error('Please @mention a user or type their ID.'); }

        let vc = user.voiceChannel;
        if (vc) {
            try {
                let channel = this.message.guild.channels.find((x: GuildChannel) => x.type === 'voice' && x.name === channelName) as VoiceChannel;
                if (!channel) {
                    return this.error('Channel not found. The channel name is **cAsE sEnsItIve**.');
                }
                await user.setVoiceChannel(channel);
                return this.success(`Successfully moved ${user} to **${channel.name}**.`);
            } catch (e) {
                return this.error('Failed to move user. Are you sure I have sufficient permissions?');
            }
        } else {
            return this.error('User is not in a voice channel.');
        }
    }

}
