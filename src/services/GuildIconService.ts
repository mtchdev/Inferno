import { existsSync, mkdirSync, writeFileSync, createWriteStream } from "fs";
import { Guild } from "discord.js";
import http from 'https';

export abstract class GuildIconService {
    public static getIcon(guild: Guild): Promise<string> {
        return new Promise((resolve, reject) => {
            const path = process.env.NODE_ENV === 'prod' ? process.cwd() + '/build' : process.cwd();
            if (!existsSync(__dirname + '/../../.imgcache')) {
                mkdirSync(__dirname + '/../../.imgcache');
            }
    
            if (existsSync(__dirname + '/../../.imgcache/'+guild.id+'.jpg')) {
                resolve(`${path}/.imgcache/${guild.id}.jpg`);
            } else {
                let file = createWriteStream(__dirname + '/../../.imgcache/' + guild.id + '.jpg');
                http.get(guild.iconURL, (response: any) => {
                    response.pipe(file);
                    setTimeout(() => {
                        file.close();
                        resolve(`${path}/.imgcache/${guild.id}.jpg`);
                    }, 100);
                });
            } 
        });
    }
}
