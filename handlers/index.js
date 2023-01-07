// import all handlers to here and export it from here

const getUsers = require('./consumer-handlers').getUsers
const getUserById = require('./consumer-handlers').getUserById
const createUser = require('./consumer-handlers').createUser
const updateUser = require('./consumer-handlers').updateUser
const deleteUser = require('./consumer-handlers').deleteUser
const loginUser = require('./consumer-handlers').loginUser

const getComplaints = require('./complaint-handlers').getComplaints
const getComplaintById = require('./complaint-handlers').getComplaintById
const getComplaintByConsumerId = require('./complaint-handlers').getComplaintByConsumerId
const createComplaint = require('./complaint-handlers').createComplaint
const updateComplaint = require('./complaint-handlers').updateComplaint
const deleteComplaint = require('./complaint-handlers').deleteComplaint
const resolveComplaint = require('./complaint-handlers').resolveComplaint

const getBills = require('./bill-handlers').getBills
const getBillById = require('./bill-handlers').getBillById
const getBillByConsumerId = require('./bill-handlers').getBillByConsumerId
const getLatestBillByConsumerId = require('./bill-handlers').getLatestBillByConsumerId
const createBill = require('./bill-handlers').createBill
const updateBill = require('./bill-handlers').updateBill
const deleteBill = require('./bill-handlers').deleteBill

const getBillStatus = require('./billStatus-handlers').getBillStatus
const getBillStatusById = require('./billStatus-handlers').getBillStatusById
const createBillStatus = require('./billStatus-handlers').createBillStatus
const updateBillStatus = require('./billStatus-handlers').updateBillStatus
const deleteBillStatus = require('./billStatus-handlers').deleteBillStatus

const getAdmins = require('./admin-handlers').getAdmins
const getAdminById = require('./admin-handlers').getAdminById
const createAdmin = require('./admin-handlers').createAdmin
const loginAdmin = require('./admin-handlers').loginAdmin
const updateAdmin = require('./admin-handlers').updateAdmin
const deleteAdmin = require('./admin-handlers').deleteAdmin

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getComplaints,
    getComplaintById,
    getComplaintByConsumerId,
    createComplaint,
    updateComplaint,
    deleteComplaint,
    resolveComplaint,
    getBills,
    getBillById,
    getBillByConsumerId,
    getLatestBillByConsumerId,
    createBill,
    updateBill,
    deleteBill,
    getBillStatus,
    getBillStatusById,
    createBillStatus,
    updateBillStatus,
    deleteBillStatus,
    getAdmins,
    getAdminById,
    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin
}
