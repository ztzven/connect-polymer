"use strict";

import * as crypto from "crypto";
import * as fs from "fs";
import * as mime from "mime-types";
import * as path from "path";
import * as scriptHook from "html-script-hook";

const cache = {};

export async function getFile(absolutePath): Promise<string> {
    const extname = path.extname(absolutePath);
    if (!extname) { return "" };
    const pathMime = mime.lookup(extname);
    const stats = await new Promise<fs.Stats>((resolve, reject) => fs.stat(absolutePath, (err, stats) => err ? reject(err) : resolve(stats)));
    if (stats.isFile()) {
        const fileHash = crypto.createHash("SHA256").update(`${absolutePath}/${stats.mtime}`).digest("base64"); 
        if (!cache[fileHash]) {
            let content = await new Promise((resolve, reject) => fs.readFile(absolutePath, "utf8", (err, data) => err ? reject(err) : resolve(data)));
            if (pathMime === "text/html") {
                content = scriptHook(content);
            } else {
                content = content;
            }
            cache[fileHash] = content;
        }
        return cache[fileHash];
    } else {
        return "";
    }
}
