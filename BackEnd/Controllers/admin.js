const Event = require("../Models/event");
const User = require("../Models/user");
const { createError } = require("../Utils/error");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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


const adminLogin = async (req,res,next) =>{
       try {
              console.log('rkeghei');
              const {email,password} = req.body
              const user = await User.findOne({email:email})
              if(!user){
                       return next(createError(401,'Email Not Found'))
              }
              else{
                     if (user.isAdmin === true) {

                            const checkPassword = await bcrypt.compare(password, user.password)
                            if (checkPassword) {
                                   const tocken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY)
                                   const { password, isAdmin, ...otherDetails } = user._doc
                                   res.cookie('access_tocken', tocken, {
                                          httpOnly: true,
                                          path: '/'
                                   }
                                   ).status(200).json({ ...otherDetails });
                            }
                            else {
                                   return next(createError(401, 'Invalid Credentials'))
                            }
                     }
                     else{
                            return next(createError(401, 'Login Failed')) 

                     }
              }
         } catch (error) {
              console.log(error);
                        return next(createError(401,'Login Failed'))
               
         }
}

module.exports = {
       getAllTickets ,
       deleteEvent,
       getEvent,
       updateEvent,
       adminLogin
}