const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/general/${new Date()
        .toISOString()
        .slice(0, 10)
        .replace("T", " ")}.log`,
    }),
  ],
});

const server_logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/server/${new Date()
        .toISOString()
        .slice(0, 10)
        .replace("T", " ")}.log`,
    }),
  ],
});

module.exports = {
  logger: logger,
  server_logger: server_logger,
};
