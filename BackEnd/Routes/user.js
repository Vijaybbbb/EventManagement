const express = require('express')
const { register, login, checkout } = require('../Controllers/user')
const router = express.Router()

//register User               
router.post('/register', register)

//Login User
router.post('/login',login)

router.post('/checkout',checkout)


module.exports  = router