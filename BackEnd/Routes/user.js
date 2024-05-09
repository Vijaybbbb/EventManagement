const express = require('express')
const { register, login, checkout, verifyPayment } = require('../Controllers/user')
const router = express.Router()

//register User               
router.post('/register', register)

//Login User
router.post('/login',login)

router.post('/checkout',checkout)

router.post('/verifyPayment',verifyPayment)

module.exports  = router