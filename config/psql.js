const Pool = require('pg').Pool
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DB_URL,
    ssl: process.env.DATABASE_URL ? true : false
})

module.exports = pool