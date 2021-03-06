"use strict";

import * as browserCapabilities from "browser-capabilities";
import * as getCompileTarget from "polyserve/lib/get-compile-target.js";
import * as polymerBuild from "polymer-build";

export function transformJs(userAgent: string, content: string, packageName: string, absolutePath: string, npm: boolean, rootDir: string, componentDir: string) {
    const capabilities = browserCapabilities.browserCapabilities(userAgent);
    const compileTarget = getCompileTarget.getCompileTarget(capabilities, "auto");

    const options = {
        compileTarget,
        transformModules: !capabilities.has("modules"),
    };

    return polymerBuild.jsTransform(content, {
        compile: options.compileTarget,
        transformModulesToAmd: options.transformModules ? "auto" : false,
        moduleResolution: npm ? "node" : "none",
        filePath: absolutePath,
        isComponentRequest: false, // req.baseUrl === componentDir,
        packageName,
        componentDir,
        rootDir
    });
}