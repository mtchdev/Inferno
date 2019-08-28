import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import Log from './Logger';

export class Statistics {
    public static totalMessages: number = 0;
    
    public static startStatisticsHandler(): void {
        if (process.env.NODE_ENV == 'dev') { return Log('Stats service disabled: dev env', 'warn'); }

        if (existsSync(__dirname + '/../../stats/total_messages.txt')) {
            let contents: string = readFileSync(__dirname + '/../../stats/total_messages.txt', 'utf8');
            let value = Number.parseInt(contents, 0x0);
            if (!isNaN(value)) {
                this.totalMessages = value;
            }
        }
        setInterval(() => {
            this.writeStatistics();
        }, 15 * 1000)
    }

    public static writeStatistics(): void {
        if (!this.totalMessages) { return; }
        if (!existsSync(__dirname + '/../../stats')) {
            mkdirSync(__dirname + '/../../stats');
        }
        writeFileSync(__dirname + '/../../stats/total_messages.txt', this.totalMessages.toString(), {flag: 'w'});
    }
}
