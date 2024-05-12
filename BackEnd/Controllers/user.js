const User = require('../Models/user.js')
const Event = require('../Models/event.js')

const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');
const { createError } = require('../Utils/error.js');
const { razorpayInstance } = require('../Utils/paymentController.js');
const { Mongoose, default: mongoose } = require('mongoose');
const Ticket = require('../Models/ticket.js');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env
const crypto = require('crypto');
const { sendToEmail } = require('../Utils/sendEmail.js');


//user registration
const register =  async (req, res, next) => {
       console.log('entered login');
       try {
           const { username, email, password } = req.body;
           const findExistingUser = await User.findOne({ email });
           if (findExistingUser) {
               return next(createError(401,'User Already Exists'))
           }

          const hashedPassword = await bcrypt.hash(password,10)   
          const newUser = {
            username: username, 
            email: email,
            password: hashedPassword,   
            };
             
           await User.create(newUser)
           res.status(200).json({ message: 'User registered successfully' });

       } catch (error) {
              console.log(error);
              next(createError(401,"User registration failed"))   
       }
   };


//user login
const login = async(req,res,next) =>{

       try {
            const {email,password} = req.body
            const user = await User.findOne({email:email})
            if(!user){
                     return next(createError(401,'User Not Found'))
            }
            if(user.isBlocked == true){
              return next(createError(401,'User Blocked'))
            }
            else{
              const checkPassword = await bcrypt.compare(password,user.password)
              if(checkPassword){
                     const tocken  = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY)
                     const {password,isAdmin,...otherDetails} = user._doc
                     res.cookie('access_tocken',tocken,{
                            httpOnly:true,
                            path:'/'
                            }
                            ).status(200).json({...otherDetails});
              }
              else{
                     return next(createError(401,'Invalid Credentials'))
              }
            }
       } catch (error) {
                      return next(createError(401,'Login Failed'))
             
       }
}



const checkout = async(req,res,next) =>{
       const {userData,data,total,ticket,userId} = req.body

       try {
              //create ticket for event 
              const obj = {
                     eventId:new mongoose.Types.ObjectId(data._id),
                     eventName:data.eventName,
                     des:data.description,
                     organizer:data.organizer,
                     userId:new mongoose.Types.ObjectId(userId),
                     ticketType:ticket.ticket.type,
                     price:total,
                     expires:data.date
              }
              
              await Ticket.create(obj)
              const allTicket  = await Ticket.find()
              const lastData = allTicket[allTicket.length-1]


              const amount = total * 100
             
              const options = {
                     amount: amount,
                     currency: 'INR',
                     receipt: 'vijayramkp2002@gmail.com'
              }
              razorpayInstance.orders.create(options,
                     (err, order) => {
                            if (!err) {

                                   res.status(200).json({
                                          success: true,
                                          msg: 'order created',
                                          order_id: order.id,
                                          key_id: RAZORPAY_ID_KEY,
                                          name: data.eventName,
                                          amount: amount,
                                          order: order,
                                          lastDataId:lastData,
                                          eventId:data._id
                                   })
                            } else {
                                   console.log(err);
                            }
                     }
              )

       } catch (error) {
              console.log(error);
       }
}




//verify payment
const verifyPayment = async (req, res, next) => {
       const { response, ticketId, userId ,eventId} = req.body

       const payment_id = response.razorpay_payment_id;
       const order_id = response.razorpay_order_id
       const signature = response.razorpay_signature;

       const user  = await User.findById(userId)
       const ticket  = await Ticket.findById(ticketId)



       try {
              const hmac = crypto.createHmac('sha256', RAZORPAY_SECRET_KEY);
              hmac.update(order_id + '|' + payment_id);

              // Calculating the HMAC digest (resulting hash)
              const digest = hmac.digest('hex');

              if (digest == signature) {
                     console.log("payment successs",);

                     await Event.findByIdAndUpdate(eventId,{
                            $addToSet:{
                                   bookedUsers:userId
                            }
                     })

                     PaymentStatus(ticketId, userId).then((data)=>{
                          sendToEmail(user.email,ticket)
                     }).catch(err=>console.log(err))

                     res.status(200).json({ message: 'order placed', response: response })
              }

       } catch (error) {
              console.log(error);
              next(createError(401, 'Payment Failed'))
       }

}



//set payment status to each new bookings
async function PaymentStatus(ticketId, userId) {

       try {

              const result = await Ticket.updateOne(
                     { _id: ticketId},
                     { $set: { "confirmed": true } }
              );

              await User.findByIdAndUpdate(userId,{
                     $addToSet:{
                            bookedTickets:ticketId
                     }
              })

              return result;

       } catch (error) {
              console.log(error);
       }
}



async function allTickets(req,res,next) {

       try {

              const result = await User.findById(req.query.id).populate('bookedTickets')            
              res.status(200).json(result.bookedTickets.reverse())    

       } catch (error) { 
              console.log(error); 
       } 
}  







   module.exports = {
       register,
       login,
       checkout,
       verifyPayment,
       allTickets
   }