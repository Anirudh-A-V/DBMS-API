const pool = require('../config/psql');

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

module.exports = {
    getBillStatus,
    getBillStatusById,
    createBillStatus,
    updateBillStatus,
    deleteBillStatus,
}
