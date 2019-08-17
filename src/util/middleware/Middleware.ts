import GuildConfig from 'src/util/GuildConfig';

export interface PluginMiddlewareObject {
    run(): Promise<boolean>;
    getGuildConfig(): Promise<GuildConfig>
}