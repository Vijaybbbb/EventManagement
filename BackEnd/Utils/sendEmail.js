const nodeMailer  = require('nodemailer');
const { htmlContent } = require('./confirmation');

//nodemailer Setup
const transport = nodeMailer.createTransport({
       service: "gmail",
       auth: {
         user: 'eventszoevents@gmail.com', 
         pass: "yaye wufq diry qodw",
       },
       secure: true, // Use TLS
       tls: {
         rejectUnauthorized: false, // Disable TLS certificate verification
       },
     });

//send otp to email
 const sendToEmail = (email) =>{
       return new Promise((resolve,reject)=>{
              const mailOptions = {
                     from: 'eventszoevents@gmail.com',
                     to: email,
                     subject: "Confermation Email",
                     html:htmlContent
                   };
              transport.sendMail(mailOptions, (err) => {
                     if (err) {
                            reject(new Error("Failed to send OTP"));
                      } else {
                             console.log("email Sent successfully");
                             resolve("OTP Sent successfully");
                      }
               });
       })
 }

 //verify otp
     



module.exports = {
       sendToEmail
}