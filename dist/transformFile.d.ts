interface IMiddlewareOptions {
    root: string;
    ignoreBasePath: boolean;
    exclude: Array<string>;
    include: Array<string>;
    npm: boolean;
}
export declare function transformFile(userAgent: string, absolutePath: string, options: IMiddlewareOptions): Promise<string>;
export {};
