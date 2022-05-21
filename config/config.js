require("dotenv").config();

const config = {
  development: {
    username: "process.env.DEV_USERNAME",
    password: "process.env.DEV_PASSWORD",
    database: "process.env.DEV_DATABASE",
    host: "process.env.DEV_HOST",
    dialect: "mysql",
  },
  test: {
    username: "process.env.DEV_USERNAME",
    password: "process.env.DEV_PASSWORD",
    database: "process.env.DEV_DATABASE",
    host: "process.env.DEV_HOST",
    dialect: "mysql",
  },
  production: {
    username: "process.env.DB_USERNAME",
    password: "process.env.DB_PASSWORD",
    database: "process.env.DB_DATABASE",
    host: "process.env.DB_HOST",
    dialect: "mysql",
    use_env_variable: "CLEARDB_DATABASE_URL",
  },
};

module.exports = config;
