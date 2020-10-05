"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
exports.default = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "tsc_node",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": 'tsc_node',
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": process.env.DB_PASSWORD,
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
//# sourceMappingURL=config.js.map