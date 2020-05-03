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
    timezone: '+09:00',
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true
    },
    define: {
      timestamps: true
    }
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dreamwitch",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false,
    timezone: '+09:00',
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true
    },
    define: {
      timestamps: true
    }
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dreamwitch",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false,
    timezone: '+09:00',
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true
    },
    define: {
      timestamps: true
    }
  },
};
