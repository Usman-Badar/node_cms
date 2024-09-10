const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const compression = require('compression');
const { server_logger, logger } = require('./utilities/logger');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 8080;

process.on('unhandledRejection', function(err) {
    logger.error(err.stack ? err.stack : err, {label: 'unhandledRejection'});
});
process.on('uncaughtException', function(err) {
    logger.info(err.stack, {label: 'uncaughtException'});
});

const io = require('socket.io')( server, {
    cors: {
        origin: "*",
        methods: ['GET','POST']
    }
});

module.exports = io;
const host = `http://localhost:${port}`;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', host);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:100000}));
app.use(cors());
app.use(express.json());
app.use(compression());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.use(require('./routes'));

http.globalAgent.maxSockets = Infinity;

app.get("/", (req, res) => {
  const dir = "./sites";
  const sites = [];
  const f = fs.readdirSync(dir);
  for (let x = 0; x < f.length; x++) {
    const stats = fs.statSync(`${dir}/${f[x]}`);
    sites.push({
      name: f[x],
      createdAt: stats.birthtime,
    });
  }
  const data = { sites: sites };
  res.render("index", data);
});

server.listen(port, () => {
    server_logger.info(`listening on:\n\n\t${host}`, {label: 'SERVER STARTED'});
})