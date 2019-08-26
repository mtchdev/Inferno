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
            this.sendMessageToOwner();
            Log(`Joined ${this.guild.name}!`);
        } catch (e) {
            Log(e, 'error');
            this.guild.leave(); // Leave because can't make guild config
        }
    }

    private async sendMessageToOwner() {
        this.guild.owner.send(`Hey! Thanks for adding me to **${this.guild.name}**.\n\nTo get started, the default prefix is \`;\` (you can change this). Most commands will work out of the box, but you will need to set up an **Admin** and **Moderator** role to get the full permissions experience. Type \`;help\` to get more information.\nIf you need anything, don't hesitate to speak to the community: https://discord.gg/HBDS6cH\n\nEnjoy ❤`);
    }
}
