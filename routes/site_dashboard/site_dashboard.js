const express = require('express');
const app = express();

app.get("/site/dashboard", (req, res) => {
  res.render("site_dashboard/site_dashboard");
});

module.exports = app;