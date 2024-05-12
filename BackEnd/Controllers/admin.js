const Event = require("../Models/event")


const getAllTickets = async (req,res,next) =>{
              try {
                     const result  = await  Event.find()
                     res.status(200).json(result)
                     
              } catch (error) {
                     
              }
}


module.exports ={
       getAllTickets 
}