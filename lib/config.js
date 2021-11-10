//environment variable and configuration file

//container for all environment
var env = {};

// staging will be a default environment
env.staging = {
    'http_port': 3000,
    'https_port': 3001,
    'env_name': 'staging',
    'hashSecret': 'thisisasecret'
};

//productions environment
env.production = {
    'http_port': 5000,
    'https_port': 5001,
    'env_name': 'production',
    'hashSecret': 'thisisasecret'
};

//determine which environment was passed to command-line arguments
var current_env = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check  that current environment is one environment above if not default to staging.
var env_export = typeof (env[current_env]) == 'object' ? env[current_env] : env.staging;

//export module
module.exports = env_export;