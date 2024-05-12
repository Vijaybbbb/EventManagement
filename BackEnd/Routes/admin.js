const express = require('express')
const { getAllTickets, deleteEvent, getEvent, updateEvent, adminLogin } = require('../Controllers/admin')
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

router.post('/adminLogin',adminLogin)

router.get('/allTickets',getAllTickets)

router.post('/deleteEvent',deleteEvent)

router.get('/getEvent',getEvent)

router.post('/update',upload.single('image'),updateEvent)

module.exports  = router