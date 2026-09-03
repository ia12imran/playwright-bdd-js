const winston = require("winston");
const path = require("path");
const fs = require("fs-extra");

class Logger {
  static instance = null;
  static transports = [];

  static getInstance() {
    if (!this.instance) {
      const logLevel = process.env.LOG_LEVEL || "info";
      const environment = process.env.NODE_ENV || "dev";

      // Ensure log directory exists
      const logDir = path.join("reports/logs");
      fs.ensureDirSync(logDir);

      // Configure transports
      const transports = [
        // File transport for errors
        new winston.transports.File({
          filename: path.join(logDir, "error.log"),
          level: "error",
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        // File transport for combined logs
        new winston.transports.File({
          filename: path.join(logDir, "combined.log"),
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ];

      // Add console transport for non-production environments
      if (environment !== "production") {
        transports.push(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
              }),
              winston.format.printf(
                ({ timestamp, level, message, ...meta }) => {
                  const metaStr = Object.keys(meta).length
                    ? JSON.stringify(meta)
                    : "";
                  return `${timestamp} ${level}: ${message} ${metaStr}`;
                },
              ),
            ),
          }),
        );
      }

      // Create logger instance
      this.instance = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
          winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
          }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.json(),
        ),
        defaultMeta: {
          service: "playwright-cucumber",
          environment: environment,
          processId: process.pid,
        },
        transports: transports,
      });

      // Store transports for later access
      this.transports = transports;

      // Log startup message
      this.instance.info("🚀 Logger initialized", {
        environment: environment,
        logLevel: logLevel,
      });
    }
    return this.instance;
  }

  // Static methods for easy logging
  static log(level, message, meta = {}) {
    const logger = this.getInstance();
    logger.log(level, message, meta);
  }

  static info(message, meta = {}) {
    this.log("info", message, meta);
  }

  static error(message, meta = {}) {
    this.log("error", message, meta);
  }

  static warn(message, meta = {}) {
    this.log("warn", message, meta);
  }

  static debug(message, meta = {}) {
    this.log("debug", message, meta);
  }

  static verbose(message, meta = {}) {
    this.log("verbose", message, meta);
  }

  // Additional utility methods
  static createChild(moduleName) {
    const logger = this.getInstance();
    return logger.child({ module: moduleName });
  }

  static getTransports() {
    return this.transports;
  }

  static async close() {
    if (this.instance) {
      await new Promise((resolve) => {
        this.instance.on("finish", resolve);
        this.instance.end();
      });
      this.instance = null;
    }
  }

  // Method to add custom transport
  static addTransport(transport) {
    const logger = this.getInstance();
    logger.add(transport);
    this.transports.push(transport);
  }

  // Method to remove transport
  static removeTransport(transport) {
    const logger = this.getInstance();
    logger.remove(transport);
    const index = this.transports.indexOf(transport);
    if (index > -1) {
      this.transports.splice(index, 1);
    }
  }
}

// Singleton instance
let loggerInstance = null;

// Export function to get logger instance
function getLogger() {
  if (!loggerInstance) {
    loggerInstance = Logger.getInstance();
  }
  return loggerInstance;
}

module.exports = {
  Logger,
  getLogger,
};
