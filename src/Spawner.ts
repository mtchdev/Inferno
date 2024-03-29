import { Client } from 'discord.js';
import { ReminderService } from 'src/services/ReminderService';
import { MuteService } from 'src/services/MuteService';
import { CleanImageCacheService } from 'src/services/CleanImageCache';
import Log from 'src/util/Logger';
import { http } from 'src/services/HTTPService';

export abstract class Spawner {

    public static spawn(client: Client): Promise<Client> {
        return new Promise(async (resolve, reject) => {
            try {
                Log('Starting bot...');
                await client.login(process.env.BOT_TOKEN);
                client.user.setActivity(process.env.DEFAULT_STATUS);

                Log(`Authenticated as ${client.user.username}#${client.user.discriminator}`, 'success');
                http.initialize();
                ReminderService.init(client);
                MuteService.init(client);
                CleanImageCacheService.init();
                Log('All bot services running.');
                resolve(client)
            } catch (e) {
                Log(e, 'error');
                reject(e);
                throw new Error(e);
            }
        });
    }

}
