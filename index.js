

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
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/bills', db.getBills)
app.get('/bills/:id', db.getBillById)
app.post('/bills', db.createBill)
app.put('/bills/:id', db.updateBill)
app.delete('/bills/:id', db.deleteBill)

app.get('/billstatus', db.getBillStatus)
app.get('/billstatus/:id', db.getBillStatusById)
app.post('/billstatus', db.createBillStatus)
app.put('/billstatus/:id', db.updateBillStatus)
app.delete('/billstatus/:id', db.deleteBillStatus)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

