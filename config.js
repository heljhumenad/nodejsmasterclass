//environment variable and configuration file

//container for all environment
let env = {};

// staging will be a default environment
env.staging = {
    'port': 3000,
    'env_name': 'staging'
};

//productions environment
env.production = {
    'port': 5000,
    'env_name': 'production'
};

//determine which environment was passed to command-line arguments
let current_env = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check  that current environment is one environment above if not default to staging.
let env_export = typeof (env[current_env]) == 'object' ? env[current_env] : env.staging;

//export module
module.exports = env_export;