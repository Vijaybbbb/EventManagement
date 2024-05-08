const express = require('express')
const { createEvent, allEvents, singleEvent } = require('../Controllers/event')
const router = express.Router()

router.post('/create', createEvent)

router.get('/allEvents', allEvents)

router.get('/:id', singleEvent)

module.exports  = router