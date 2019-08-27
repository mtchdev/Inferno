import { writeFileSync, existsSync, mkdirSync } from "fs";

export class Statistics {
    public static totalMessages: number = 0;
    
    public static startStatisticsHandler(): void {
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
