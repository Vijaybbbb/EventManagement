const express = require('express')
const { createEvent, allEvents, singleEvent } = require('../Controllers/event')
const router = express.Router()

const multer  = require('multer')
const storage = multer.diskStorage({

       destination:function(req,file,cb){
              cb(null,'../FrontEnd/src/assets/uploads')
       }, 
       filename:function (req,file,cb){
              const uniqueSuffix = Date.now()
              cb(null,uniqueSuffix+file.originalname)
       }
})

const upload = multer({storage:storage})


router.post('/create',upload.single('image'), createEvent)

router.get('/allEvents', allEvents)    

router.get('/:id', singleEvent)

module.exports  = router