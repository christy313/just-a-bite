require("dotenv").config();

const config = {
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    dialect: "mysql",
    use_env_variable: process.env.JAWSDB_URL,
  },
};
module.exports = config;
