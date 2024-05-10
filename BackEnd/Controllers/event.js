const { createError } = require("../Utils/error")
const Event  = require('../Models/event')


const createEvent  = async(req,res,next) => {

       const data = {
              ...req.body,
              images:req.file.filename
       }
       try { 
            await Event.create(data)  
            res.status(200).json("success")
       } catch (error) {
             next( createError(401,'Event Creation Failed'))
       }
}

const allEvents  = async(req,res,next) => {
       
       try {

              if(req.query.searchText !== ''){
                     if(req.query.sortOption  !== '' && req.query.sortOption=='near'){
                            const data = await Event.find({
                                   eventName: { $regex: new RegExp(req.query.searchText, "i") },
                                   }).sort({ date: 1 })
                            res.status(200).json(data) 
                     }if(req.query.sortOption  !== '' && req.query.sortOption=='far'){
                            const data = await Event.find({
                                   eventName: { $regex: new RegExp(req.query.searchText, "i") },
                                   }).sort({ date: -1 })
                            res.status(200).json(data) 
                     }
                     const data = await Event.find({
                            eventName: { $regex: new RegExp(req.query.searchText, "i") },
                            })
                            res.json(data)
              }
              else{
                     if(req.query.sortOption  !== '' && req.query.sortOption=='near'){
                            const data =  await Event.find().sort({ date: 1 })
                            res.status(200).json(data) 
                     }
                     if(req.query.sortOption  !== '' && req.query.sortOption=='far'){
                            const data =  await Event.find().sort({ date: -1 })
                            res.status(200).json(data) 
                     }

                     const data =  await Event.find()
                     res.status(200).json(data) 
              }

       } catch (error) {
             next( createError(401,'Events fetching Failed')) 
       }
}



const singleEvent  = async(req,res,next) => {
       
       try {
           const data =  await Event.findById(req.params.id)
           res.status(200).json(data)
       } catch (error) {
             next( createError(401,'Event fetching Failed'))
       }
}

module.exports = {
       createEvent,
       allEvents,
       singleEvent
}