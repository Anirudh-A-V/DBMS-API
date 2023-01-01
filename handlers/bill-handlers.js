const pool = require('../config/psql');

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

module.exports = {
    getBills,
    getBillById,
    getBillByConsumerId,
    createBill,
    updateBill,
    deleteBill
}
