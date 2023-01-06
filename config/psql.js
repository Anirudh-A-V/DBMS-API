const Pool = require('pg').Pool
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DB_URL,
    ssl: process.env.DATABASE_URL ? true : false
})

pool.connect((err) => {
    if (err) {
        return console.log(err.name + ': ' + err.message)
    } else {
        console.log('Connected to database')
    }
})

module.exports = pool