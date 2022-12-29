const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const db = require('./queries')
require('dotenv').config();

const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json(
    {
      "message": "Welcome to the Electricity Billing System API",
      "routes": [
        {
          "route": "/users",
          "methods": [
            "GET",
            "POST"
          ]
        },
        {
          "route": "/users/:id",
          "methods": [
            "GET",
            "PUT",
            "DELETE"
          ]
        },
        {
          "route": "/bills",
          "methods": [
            "GET",
            "POST"
          ]
        },
        {
          "route": "/bills/:id",
          "methods": [
            "GET",
            "PUT",
            "DELETE"
          ]
        },
        {
          "route": "/bills/consumer/:id",
          "methods": [
            "GET"
          ]
        },
        {
          "route": "/billstatus",
          "methods": [
            "GET",
            "POST"
          ]
        },
        {
          "route": "/billstatus/:id",
          "methods": [
            "GET",
            "PUT",
            "DELETE"
          ]
        },
        {
          "route": "/complaint",
          "methods": [
            "GET",
            "POST"
          ]
        },
        {
          "route": "/complaint/:id",
          "methods": [
            "GET",
            "PUT",
            "DELETE"
          ]
        },
        {
          "route": "/complaint/consumer/:id",
          "methods": [
            "GET"
          ]
        },
        {
          "route": "/complaint/resolve/:id",
          "methods": [
            "PUT"
          ]
        },
        {
          "route": "/admin",
          "methods": [
            "GET",
            "POST"
          ]
        },
        {
          "route": "/admin/:id",
          "methods": [
            "GET",
            "PUT",
            "DELETE"
          ]
        },
        {
          "route": "/admin/login",
          "methods": [
            "POST"
          ]
        },
        {
          "route": "/users/login",
          "methods": [
            "POST"
          ]
        }
      ]
    }
  )
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/bills', db.getBills)
app.get('/bills/:id', db.getBillById)
app.get('/bills/consumer/:id', db.getBillByConsumerId)
app.post('/bills', db.createBill)
app.put('/bills/:id', db.updateBill)
app.delete('/bills/:id', db.deleteBill)

app.get('/billstatus', db.getBillStatus)
app.get('/billstatus/:id', db.getBillStatusById)
app.post('/billstatus', db.createBillStatus)
app.put('/billstatus/:id', db.updateBillStatus)
app.delete('/billstatus/:id', db.deleteBillStatus)

app.get('/complaint', db.getComplaints)
app.get('/complaint/:id', db.getComplaintById)
app.post('/complaint', db.createComplaint)
app.put('/complaint/:id', db.updateComplaint)
app.delete('/complaint/:id', db.deleteComplaint)
app.get('/complaint/consumer/:id', db.getComplaintByConsumerId)
app.put('/complaint/resolve/:id', db.resolveComplaint)

app.get('/admin', db.getAdmins)
app.get('/admin/:id', db.getAdminById)
app.post('/admin', db.createAdmin)
app.put('/admin/:id', db.updateAdmin)
app.delete('/admin/:id', db.deleteAdmin)

app.post('/admin/login', db.loginAdmin)
app.post('/users/login', db.loginUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app;