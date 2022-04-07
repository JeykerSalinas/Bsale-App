const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(__dirname));
const port = process.env.PORT || 3000;
app.listen(port);