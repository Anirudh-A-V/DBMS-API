// Description: This file contains the old structure of the queries and the database connection

const Pool = require('pg').Pool
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DB_URL,
    ssl: process.env.DATABASE_URL ? true : false
})

/*--------------------------------------------------------------------------------------------------------------------- */

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

/*--------------------------------------------------------------------------------------------------------------------- */

// Bill queries

const getBills = (request, response) => {
    pool.query('SELECT * FROM bill ORDER BY bill_id ASC', (error, results) => {
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

const getBillById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM bill WHERE bill_id = $1', [id], (error, results) => {
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

const getBillByConsumerId = (request, response) => {
    const { month, year } = request.body
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM bill WHERE consumer_id = $1 AND month = $2 AND year = $3', [id, month, year], (error, results) => {
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

const createBill = (request, response) => {
    const { consumer_id, units, current_reading, due_date, tax } = request.body

    pool.query('INSERT INTO bill (consumer_id, units, current_reading, due_date, tax) VALUES ($1, $2, $3, $4, $5)', [consumer_id, units, current_reading, due_date, tax], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`Bill added with ID: ${results.oid}`)
    })
}

const updateBill = (request, response) => {
    const id = parseInt(request.params.id)
    const { bill_id, consumer_id, units, current_reading, due_date, tax } = request.body

    pool.query(
        'UPDATE bill SET consumer_id = $2, units = $3, current_reading = $4, due_date = $5, tax = $6 WHERE bill_id = $1',
        [id, consumer_id, units, current_reading, due_date, tax],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    success: false,
                    error: error.name,
                    message: error.message
                })
            }
            response.status(200).send(`Bill modified with ID: ${id}`)
        }
    )
}

const deleteBill = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM bill WHERE bill_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).send(`Bill deleted with ID: ${id}`)
    })
}

/*--------------------------------------------------------------------------------------------------------------------- */

// Billstatus queries

const getBillStatus = (request, response) => {
    pool.query('SELECT * FROM billstatus ORDER BY bill_id ASC', (error, results) => {
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

const getBillStatusById = (request,
    response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM billstatus WHERE bill_id = $1', [id], (error, results) => {
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

const createBillStatus = (request, response) => {
    const { bill_id, status } = request.body

    pool.query('INSERT INTO billstatus (bill_id, status) VALUES ($1, $2)', [bill_id, status], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`Bill status added with ID: ${results.insertId}`)
    })
}

const updateBillStatus = (request, response) => {
    const id = parseInt(request.params.id)
    const { bill_id, status } = request.body

    pool.query(
        'UPDATE billstatus SET bill_id = $2, status = $3 WHERE bill_id = $1',
        [id, bill_id, status],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    success: false,
                    error: error.name,
                    message: error.message
                })
            }
            response.status(200).send(`Bill status modified with ID: ${id}`)
        }
    )
}

const deleteBillStatus = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM billstatus WHERE bill_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).send(`Bill status deleted with ID: ${id}`)
    })
}

/*--------------------------------------------------------------------------------------------------------------------- */

// Complaint queries

const getComplaints = (request, response) => {
    pool.query('SELECT * FROM complaint ORDER BY complaint_id ASC', (error, results) => {
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

const getComplaintById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM complaint WHERE complaint_id = $1', [id], (error, results) => {
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

const createComplaint = (request, response) => {
    const { consumer_id, description, date, location } = request.body

    pool.query('INSERT INTO complaint (consumer_id, description, date, location) VALUES ($1, $2, $3, $4)', [consumer_id, description, date, location], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`Complaint added with ID: ${results.oid}`)
    })
}

const updateComplaint = (request, response) => {
    const id = parseInt(request.params.id)
    const { description, date, location } = request.body

    pool.query(
        'UPDATE complaint SET description = $2, date = $3, location = $4 WHERE complaint_id = $1',
        [id, description, date, location],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    success: false,
                    error: error.name,
                    message: error.message
                })
            }
            response.status(200).send(`Complaint modified with ID: ${id}`)
        }
    )
}

const deleteComplaint = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM complaint WHERE complaint_id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).send(`Complaint deleted with ID: ${id}`)
    })
}

const getComplaintByConsumerId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM complaint WHERE consumer_id = $1', [id], (error, results) => {
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

const resolveComplaint = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('UPDATE complaint SET status = $2 WHERE complaint_id = $1', [id, true], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).send(`Complaint resolved with ID: ${id}`)
    })
}

/*--------------------------------------------------------------------------------------------------------------------- */

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
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getBills,
    getBillById,
    getBillByConsumerId,
    createBill,
    updateBill,
    deleteBill,
    getBillStatus,
    getBillStatusById,
    createBillStatus,
    updateBillStatus,
    deleteBillStatus,
    getComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getComplaintByConsumerId,
    resolveComplaint,
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    loginUser
}