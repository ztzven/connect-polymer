"use strict";

import * as path from "path";
import * as mime from "mime-types";
import { getPackageName } from "web-component-tester/runner/config.js";

import { getFile } from "./getFile";
import { transformHtml } from "./transformHtml";
import { transformJs } from "./transformJs";

interface IMiddlewareOptions {
    root: string;
    ignoreBasePath: boolean;
    exclude: Array<string>;
    include: Array<string>;
    npm: boolean;
}

export async function transformFile(userAgent: string, absolutePath: string, options: IMiddlewareOptions): Promise<string> {
    const packageName = getPackageName(options);
    if (!packageName) { return ""; }
    let content = await getFile(absolutePath);
    if (!content) { return ""; }
    const extname = path.extname(absolutePath);
    if (!extname) { return ""; }
    const mimeType = mime.lookup(extname);
    const componentDir = path.join(options.root, options.npm ? "node_modules" : "bower_components");
    switch (mimeType) {
        case "text/html":
            return transformHtml(userAgent, content, packageName, absolutePath, options.npm, options.root, componentDir);
        case "application/javascript":
            return transformJs(userAgent, content, packageName, absolutePath, options.npm, options.root, componentDir);
        default:
            return content;
    }
}
