const path = require('path');
const envPath = path.resolve(process.cwd(), '../../', '.env');
require('dotenv').config({ path: envPath });

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dialect = process.env.DB_TYPE;

module.exports = {
  development: {
    host,
    username,
    password,
    database,
    dialect,
  },
}
