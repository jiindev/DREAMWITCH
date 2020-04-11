const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dreamwitch",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false,
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dreamwitch",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false,
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dreamwitch",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false,
  },
};
