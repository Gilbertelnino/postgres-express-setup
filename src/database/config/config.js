require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "12345678",
    database: "testing-app-db",
    dialect: "postgres",
    // logging: false,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "pg",
    password: process.env.DATABASE_PASSWORD,
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
