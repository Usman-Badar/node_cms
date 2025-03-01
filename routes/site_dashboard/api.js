const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const { response } = require("../../utilities/response");
const app = express();

app.get("/api/setup/site/database", async (req, res) => {
  const { website_name, host, db_name, user, password } = req.query;

  const dir = `./sites/${website_name}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/.env`, "", "utf8");

  await createEnvDatabaseSetup();
  await createNodeSetup();

  response(
    req,
    res,
    200,
    {},
    "Site Has Been Created",
    "You have successfully created your site."
  );

  async function createEnvDatabaseSetup() {
    return new Promise((resolve) => {
      const env_db_setup_content = `# ${website_name} Database credentials
  # Auto generated by ${process.env.APP_NAME}
  DB_HOST=${host}
  DB_NAME=${db_name}
  DB_USER=${user}
  DB_PASSWORD=${password}\n`;

      fs.appendFileSync(`${dir}/.env`, env_db_setup_content, "utf8");
      resolve();
    });
  }

  async function createNodeSetup() {
    return new Promise((resolve) => {
      const packages =
        "body-parser compression cors dotenv ejs express moment morgan nodemon socket.io winston";
      const command = `cd ${dir} && npm install ${packages} --prefix`;
      const package_json_content = `{
    "name": "${website_name}",
    "version": "1.0.0",
    "main": "server.js",
    "scripts": {
      "start": "node server.js"
    },
    "keywords": [],
    "author": "${process.env.APP_NAME}",
    "license": "ISC",
    "description": ""
  }`;

      fs.writeFileSync(`${dir}/package.json`, package_json_content, "utf8");
      exec(command, () => {
        resolve();
      });
    });
  }
});

module.exports = app;
