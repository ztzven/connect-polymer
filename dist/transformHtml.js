"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browserCapabilities = require("browser-capabilities");
var getCompileTarget = require("polyserve/lib/get-compile-target.js");
var polymerBuild = require("polymer-build");
function transformHtml(userAgent, content, packageName, absolutePath, npm, rootDir, componentDir) {
    var capabilities = browserCapabilities.browserCapabilities(userAgent);
    var compileTarget = getCompileTarget.getCompileTarget(capabilities, "auto");
    var options = {
        compileTarget: compileTarget,
        transformModules: !capabilities.has("modules"),
    };
    return polymerBuild.htmlTransform(content, {
        injectBabelHelpers: options.transformModules ? "full" : "none",
        injectRegeneratorRuntime: options.transformModules,
        injectAmdLoader: options.transformModules,
        js: {
            compile: options.compileTarget,
            transformModulesToAmd: options.transformModules ? "auto" : false,
            moduleResolution: npm ? "node" : "none",
            filePath: absolutePath,
            isComponentRequest: false,
            packageName: packageName,
            componentDir: componentDir,
            rootDir: rootDir
        }
    });
}
exports.transformHtml = transformHtml;
