const User = require('../Models/user.js')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');
const { createError } = require('../Utils/error.js');


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

   module.exports = {
       register,
       login
   }