const pool = require('../config/psql');

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

module.exports = {
    getComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getComplaintByConsumerId,
    resolveComplaint
}