import { Guild } from 'discord.js';
import Log from 'src/util/Logger';
import axios from 'axios';

export class GuildCreateHandler {

    constructor(public guild: Guild) {
        this.handle();
    }

    private async handle() {
        let id = this.guild.id;
        let owner = this.guild.ownerID;

        try {
            await axios.post(process.env.API_URL + 'guild', {id: id, owner: owner});
            Log(`Joined ${this.guild.name}!`);
        } catch (e) {
            Log(e, 'error');
            this.guild.leave(); // Leave because can't make guild config
        }
    }
}
