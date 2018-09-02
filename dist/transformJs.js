"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browserCapabilities = require("browser-capabilities");
var getCompileTarget = require("polyserve/lib/get-compile-target.js");
var polymerBuild = require("polymer-build");
function transformJs(userAgent, content, packageName, absolutePath, npm, rootDir, componentDir) {
    var capabilities = browserCapabilities.browserCapabilities(userAgent);
    var compileTarget = getCompileTarget.getCompileTarget(capabilities, "auto");
    var options = {
        compileTarget: compileTarget,
        transformModules: !capabilities.has("modules"),
    };
    return polymerBuild.jsTransform(content, {
        compile: options.compileTarget,
        transformModulesToAmd: options.transformModules ? "auto" : false,
        moduleResolution: npm ? "node" : "none",
        filePath: absolutePath,
        isComponentRequest: false,
        packageName: packageName,
        componentDir: componentDir,
        rootDir: rootDir
    });
}
exports.transformJs = transformJs;
