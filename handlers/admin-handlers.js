const pool = require('../config/psql');

// Admin queries

const getAdmins = (request, response) => {
    pool.query('SELECT * FROM admin ORDER BY admin_id ASC', (error, results) => {
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

const getAdminById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM admin WHERE admin_id = $1', [id], (error, results) => {
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

const createAdmin = (request, response) => {
    const { username, password } = request.body

    pool.query('INSERT INTO admin (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`Admin added with ID: ${results.insertId}`)
    })
}

const updateAdmin = (request, response) => {
    const id = parseInt(request.params.id)
    const { username, password } = request.body

    pool.query(
        'UPDATE admin SET username = $2, password = $3 WHERE admin_id = $1',
        [id, username, password],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    success: false,
                    error: error.name,
                    message: error.message
                })
            }
            response.status(200).send(`Admin modified with ID: ${id}`)
        }
    )
}

const deleteAdmin = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM admin WHERE admin_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).send(`Admin deleted with ID: ${id}`)
    })
}

const loginAdmin = (request, response) => {
    const { username, password } = request.body;

    pool.query('SELECT admin_id, username FROM admin WHERE username=$1 AND password=$2', [username, password], (error, results) => {
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
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin
}