"use strict";

const path = require("path");
const mime = require("node-mime");
const transformFile = require("./transformFile");

export function middleware(options) {
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
