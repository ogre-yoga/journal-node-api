require('dotenv').config()

module.exports = {
    development: {
      dialect: 'sqlite',
      storage: 'database.sqlite'
    },
    test: {
      use_env_variable: "database_test",
    },
    production: {
      use_env_variable: "database_production",
    }
};
