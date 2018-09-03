# Polymer Express Middleware

This middleware implements polymer build for a given directory with an express Router handler syntax, output is similar to that of `polymer serve`

## Example implementation

```javascript
const path = require("path");
const polymerExpress = require("polymer-express-middleware");
const polymerMiddlewareOptions = {
    root: path.join(__dirname, "."),
    npm: true,
    ignoreBasePath: false
};

const app = require("express")();

app.use("*", polymerExpress.middleware(polymerMiddlewareOptions));
app.use("*", async function(req, res, next) {
    const userAgent = req.get("user-agent");
    const content = await polymerExpress.transformFile(userAgent, path.join(__dirname, "index.html"), polymerMiddlewareOptions);
    res.type(".html");
    return res.send(content);
});

app.listen(80)
```
