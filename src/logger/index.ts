import "winston-daily-rotate-file";

import config from "../config";
import path from "path";
import winston from "winston";

const transports = [];
if (config.env === "production") {
	transports.push(
		new winston.transports.DailyRotateFile({
			dirname: path.resolve("logs"),
			filename: "api-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			maxSize: "1k",
			maxFiles: "30d",
			handleExceptions: true,
		})
	);
}

if (config.env === "development") {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.cli(),
				winston.format.splat(),
				winston.format.colorize(),
				winston.format.cli()
			),
		})
	);
}

if (transports.length === 0) {
	transports.push(new winston.transports.Console());
}

const Logger = winston.createLogger({
	level: "silly",
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		winston.format.errors({ stack: true }),
		winston.format.json(),
		winston.format.printf(
			(info) => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ")
		)
	),
	transports,
});

export default Logger;
