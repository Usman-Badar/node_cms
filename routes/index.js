const express = require('express');
const app = express();

app.use(require('./setup_site/setup_site'));
app.use(require('./setup_site/api'));

app.use(require('./site_dashboard/site_dashboard'));
app.use(require('./site_dashboard/api'));

module.exports = app;