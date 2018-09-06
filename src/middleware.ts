"use strict";

import * as path from "path";
import * as mime from "mime-types";
import { transformFile } from "./transformFile";
import { IMiddlewareOptions } from "./IMiddlewareOptions";

export function middleware(options: IMiddlewareOptions) {
    return async function(req, res, next) {
        const absolutePath = path.join(options.root, req.baseUrl);

        const userAgent = req.get("user-agent");
        const content = await transformFile(userAgent, absolutePath, options);

        if (!content) {
            return next();
        }

        const mimeType = mime.lookup(path.extname(absolutePath));
        res.type(mimeType);
        return res.send(content);
    };
}
