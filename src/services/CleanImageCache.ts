import rimraf from 'rimraf';
import Log from '../util/Logger';
import { existsSync } from 'fs';

export abstract class CleanImageCacheService {
    public static init(): void {
        // Clear cache at startup
        this.rimraf();
        setInterval(async () => this.rimraf(), (3600 / 2) * 1000);

        Log('Image cache service started successfully.');
    }

    private static rimraf(): void {
        if (existsSync(process.cwd() + '\\.imgcache')) {
            rimraf(process.cwd() + '\\.imgcache', () => {});
        }
    }
}
