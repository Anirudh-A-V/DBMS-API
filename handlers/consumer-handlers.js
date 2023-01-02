const pool = require('../config/psql');

// Consumer queries

const getUsers = (request, response) => {
    pool.query('SELECT * FROM consumer ORDER BY consumer_id ASC', (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM consumer WHERE consumer_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { username, address, phone, password } = request.body

    pool.query('INSERT INTO consumer (username, address, phone, password) VALUES ($1, $2, $3, $4)', [username, address, phone, password], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
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
                return response.status(400).json({
                    success: false,
                    error: error.name,
                    message: error.message
                })
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM consumer WHERE consumer_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const loginUser = (request, response) => {
    const { username, password } = request.body;

    pool.query('SELECT consumer_id, username, address, phone FROM consumer WHERE username=$1 AND password=$2', [username, password], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}