import { Inferno } from 'src/plugins/InfernoPlugin';
import { Client, Message, GuildMember } from 'discord.js';
import { Case } from 'src/entities/Case';
import { MuteService } from 'src/services/MuteService';
import { Mute } from 'src/entities/Mute';
import { http } from 'src/services/HTTPService';

export class UnmuteCommand extends Inferno.InfernoCommand implements Inferno.InfernoPlugin {

    constructor(client: Client, message: Message) {
        super({
            name: 'Unmute',
            description: 'Unmute a user',
            usage: 'unmute @user|userId',
            category: 'moderation'
        }, message, client);
    }

    async run() {
        if (!this.guild.mute_role) { return this.error('A mute role is not set.'); }
        if (!this.args[1]) { return this.error('Please @mention a user or type their ID.'); }

        let user: GuildMember = this.message.mentions.members.first();
        if (!user) {
            if (this.args[1]) {
                user = this.message.guild.members.get(this.args[1]);
                if (!user) {
                    return this.error('User doesn\'t exist, or isn\'t in this server.');
                }
            }
        }
        if (!user.roles.has(this.guild.mute_role.toString())) { return this.error('User is not muted.'); }

        let item: Case = {
            type: 'unmute',
            user_id: user.id,
            actor_id: this.message.author.id,
            reason: null,
            guild_id: this.message.guild.id
        }

        try {
            await user.removeRole(this.guild.mute_role.toString());
            let response = await http.post<Case>('case', item);
            this.success(`\`[CASE #${response.data.id}]\` Unmuted ${user}`);

            // Remove mute from tempmute database because a user can only have 1 mute per guild
            let cacheIndex: number = MuteService.Mutes.findIndex((mute: Mute) => mute.user_id === user.id && mute.guild_id === this.message.guild.id);
            if (cacheIndex < 0) { return; }
            MuteService.removeMute(MuteService.Mutes[cacheIndex]);
        } catch (e) {
            this.error(e);
        }
    }

}
