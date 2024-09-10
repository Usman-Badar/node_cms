const express = require('express');
const app = express();

app.get("/setup/site/database", (req, res) => {
  res.render("setup_site/database_setup");
});

module.exports = app;