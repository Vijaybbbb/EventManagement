const express = require('express')
const { register, login } = require('../Controllers/user')
const router = express.Router()

//register User               
router.post('/register', register)

//Login User
router.post('/login',login)


module.exports  = router