const Pool = require('pg').Pool
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DB_URL,
    ssl: process.env.DATABASE_URL ? true : false
})


// Consumer queries

const getUsers = (request, response) => {
    pool.query('SELECT * FROM consumer ORDER BY consumer_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM consumer WHERE consumer_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { username, address, phone, password } = request.body

    pool.query('INSERT INTO consumer (username, address, phone, password) VALUES ($1, $2, $3, $4)', [username, address, phone, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { consumer_id, username, address, phone, password } = request.body

    pool.query(
        'UPDATE consumer SET username = $2, address = $3, phone = $4 WHERE consumer_id = $1',
        [id, username, address, phone],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM consumer WHERE consumer_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}


// Bill queries



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}