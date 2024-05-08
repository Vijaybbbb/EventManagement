const { createError } = require("../Utils/error")
const Event  = require('../Models/event')


const createEvent  = async(req,res,next) => {
       
       try {
            await Event.create(req.body)  
            res.status(200).json("success")
       } catch (error) {
             next( createError(401,'Event Creation Failed'))
       }
}

const allEvents  = async(req,res,next) => {
       
       try {
           const data =  await Event.find()
            res.status(200).json(data)
       } catch (error) {
             next( createError(401,'Events fetching Failed'))
       }
}

module.exports = {
       createEvent,
       allEvents
}