require('dotenv').config()

module.exports = {
    development: {
      use_env_variable: "database_development",
    },
    test: {
      use_env_variable: "database_development",
    },
    production: {
      use_env_variable: "database_development",
    }
};
