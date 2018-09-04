# Connect Polymer

A middleware implementation of [polymer-build](https://github.com/Polymer/tools/tree/master/packages/build) which produces similar results to that of `polymer serve`

## Example implementation

```javascript
const path = require("path");
const polymer = require("connect-polymer");
const polymerOptions = {
    root: path.join(__dirname, "."),
    npm: true,
    ignoreBasePath: false
};

const app = require("express")();

// Middleware for Modules
app.use("*", polymer.middleware(polymerOptions));
// Fall through to serving index.html on 404
app.use("*", async function(req, res, next) {
    const userAgent = req.get("user-agent");
    const content = await polymer.transformFile(userAgent, path.join(__dirname, "index.html"), polymerOptions);
    res.type(".html");
    return res.send(content);
});

app.listen(80)
```
