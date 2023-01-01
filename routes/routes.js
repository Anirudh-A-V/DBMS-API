const express = require('express')

const db = require('../handlers/index.js')

const router = express.Router()

router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)
router.post('/users/login', db.loginUser)

router.get('/complaint', db.getComplaints)
router.get('/complaint/:id', db.getComplaintById)
router.get('/complaint/consumer/:id', db.getComplaintByConsumerId)
router.post('/complaint', db.createComplaint)
router.put('/complaint/:id', db.updateComplaint)
router.delete('/complaint/:id', db.deleteComplaint)
router.put('/complaint/resolve/:id', db.resolveComplaint)

router.get('/bills', db.getBills)
router.get('/bills/:id', db.getBillById)
router.get('/bills/consumer/:id', db.getBillByConsumerId)
router.post('/bills', db.createBill)
router.put('/bills/:id', db.updateBill)
router.delete('/bills/:id', db.deleteBill)

router.get('/billstatus', db.getBillStatus)
router.get('/billstatus/:id', db.getBillStatusById)
router.post('/billstatus', db.createBillStatus)
router.put('/billstatus/:id', db.updateBillStatus)
router.delete('/billstatus/:id', db.deleteBillStatus)

router.get('/admin', db.getAdmins)
router.get('/admin/:id', db.getAdminById)
router.post('/admin/login', db.loginAdmin)
router.post('/admin', db.createAdmin)
router.put('/admin/:id', db.updateAdmin)
router.delete('/admin/:id', db.deleteAdmin)

module.exports = router