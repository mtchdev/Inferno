export interface PluginMiddlewareObject {
    run(): Promise<boolean>;
}