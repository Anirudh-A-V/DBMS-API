const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config();

const router = require('./routes/routes.js')

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

app.use('/', router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app;