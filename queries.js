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

/*--------------------------------------------------------------------------------------------------------------------- */

// Bill queries

const getBills = (request, response) => {
    pool.query('SELECT * FROM bill ORDER BY bill_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBillById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM bill WHERE bill_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createBill = (request, response) => {
    const { consumer_id, units, amount, due_date } = request.body

    pool.query('INSERT INTO bill (consumer_id, units, amount, due_date) VALUES ($1, $2, $3, $4)', [consumer_id, units, amount, due_date], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Bill added with ID: ${results.insertId}`)
    })
}

const updateBill = (request, response) => {
    const id = parseInt(request.params.id)
    const { bill_id, consumer_id, units, amount, due_date } = request.body

    pool.query(
        'UPDATE bill SET consumer_id = $2, units = $3, amount = $4, due_date = $5 WHERE bill_id = $1',
        [id, consumer_id, units, amount, due_date],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Bill modified with ID: ${id}`)
        }
    )
}

const deleteBill = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM bill WHERE bill_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Bill deleted with ID: ${id}`)
    })
}

/*--------------------------------------------------------------------------------------------------------------------- */

// Billstatus queries

const getBillStatus = (request, response) => {
    pool.query('SELECT * FROM billstatus ORDER BY bill_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBillStatusById = (request,
    response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM billstatus WHERE bill_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createBillStatus = (request, response) => {
    const { bill_id, status } = request.body

    pool.query('INSERT INTO billstatus (bill_id, status) VALUES ($1, $2)', [bill_id, status], (error, results) => {
        if (error) {
            throw error
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
                throw error
            }
            response.status(200).send(`Bill status modified with ID: ${id}`)
        }
    )
}

const deleteBillStatus = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM billstatus WHERE bill_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Bill status deleted with ID: ${id}`)
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
    createBill,
    updateBill,
    deleteBill,
    getBillStatus,
    getBillStatusById,
    createBillStatus,
    updateBillStatus,
    deleteBillStatus
    
}