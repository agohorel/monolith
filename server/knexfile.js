require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "patch_exchange",
      port: process.env.LOCAL_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  testing: {
    client: "pg",
    connection: {
      database: "patch_exchange_testing",
      port: process.env.LOCAL_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/production"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
};
