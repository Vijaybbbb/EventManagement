const Event = require("../Models/event")


const getAllTickets = async (req,res,next) =>{
              try {
                     const result  = await  Event.find()
                     res.status(200).json(result)

              } catch (error) {
                    console.log(error); 
              }
}

const deleteEvent = async (req,res,next) =>{
       console.log(req.body.event);
              try {
                      await Event.findByIdAndDelete(req.body.event)
                     res.status(200).json("deleted")
                     
              } catch (error) {
                    console.log(error);                     
              }
}


const getEvent = async (req,res,next) =>{
      
              try {
                     const event =  await Event.findById(req.query.id)
                     res.status(200).json(event)
                     
              } catch (error) {
                    console.log(error);                     
              }
}

const updateEvent = async (req,res,next) =>{
      
       try {
              const event =  await Event.findByIdAndUpdate(req.query.id,{
                     $set: {
                            eventName: req.body.eventName,
                            eventType: req.body.eventType,
                            date: req.body.date,
                            time: req.body.time,
                            location: req.body.location,
                            description: req.body.description,
                            organizer: req.body.organizer,
                            attendeesLimit: req.body.attendeesLimit,
                           // images: req.file.filename,
                           
                     }
              })
              res.status(200).json(event)
              
       } catch (error) {
             console.log(error);                     
       }
}

module.exports = {
       getAllTickets ,
       deleteEvent,
       getEvent,
       updateEvent
}