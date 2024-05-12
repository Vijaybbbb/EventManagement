const express = require('express')
const { getAllTickets } = require('../Controllers/admin')
const router = express.Router()


router.get('/allTickets',getAllTickets)

module.exports  = router