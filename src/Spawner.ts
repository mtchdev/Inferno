import { Client } from 'discord.js';
import Log from 'src/util/Logger';

export abstract class Spawner {

    public static spawn(client: Client): Promise<Client> {
        return new Promise(async (resolve: Function, reject: Function) => {
            try {
                Log('Starting bot...');
                await client.login(process.env.BOT_TOKEN);
                client.user.setActivity(process.env.DEFAULT_STATUS);

                Log(`Authenticated as ${client.user.username}#${client.user.discriminator}`, 'success');
                resolve(client)
            } catch (e) {
                Log(e, 'error');
                reject(e);
                throw new Error(e);
            }
        });
    }

}
