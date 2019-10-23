export interface IPluginMiddleware {
    run(): Promise<boolean>;
}