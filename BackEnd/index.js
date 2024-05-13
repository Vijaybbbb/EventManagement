const express  = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const adminRouter  = require('./Routes/admin.js')
const userRouter  = require('./Routes/user.js')    
const eventRouter  = require('./Routes/event.js')
const PORT = process.env.PORT ||  3000
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');    
const cors = require('cors')
const session = require('express-session')
const {connect}  = require('./Utils/databaseConnection.js')
const { verifyTocken } = require('./Utils/verifyTocken.js') 
const { sendUpcomingEventsEmail } = require('./Utils/EmailNotfication.js')
connect();     

app.use(session({
       secret: 'your-secret-key', // Change this to a random secret key
       resave: false,
       saveUninitialized: false
   }));
   

//middlewares 
app.use(express.json()) 
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
        origin: 'https://stalwart-daifuku-f33a84.netlify.app',
        credentials: true 
        }))

//Routes middlewares
app.use('/event',eventRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)



/////app.use('/',verifyTocken)

//error handling middleware
app.use((err,req,res,next)=>{
       const errorStatus  = err.status || 500
       const errorMessage  = err.message || 'Something Went Wrong'

       return res.status(errorStatus).json({
              success:false,
              status:errorStatus,
              message:errorMessage,
              stack:err.stack
       })
})


app.post('/clearCookie', (req, res) => {
       // Set the cookie's expiration date to a past time
       try {
              res.cookie('access_tocken', '', { expires: new Date(0) });
              // Send a response
              res.status(200).json('Cookie cleared'); 
       } catch (error) {
              console.log(error);
       }
   });



app.get('/',verifyTocken,(req,res)=>{
      res.status(200).json({message:'success'})
}).listen(PORT)



const millisecondsInDay = 24 * 60 * 60 * 1000; 

// Set interval to send email once a day
setInterval(async () => {
    console.log('email sent');
    await sendUpcomingEventsEmail(); // Assuming sendUpcomingEventsEmail is an async function
}, millisecondsInDay);