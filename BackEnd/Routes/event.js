const express = require('express')
const { createEvent, allEvents } = require('../Controllers/event')
const router = express.Router()

router.post('/create', createEvent)

router.get('/allEvents', allEvents)


module.exports  = router