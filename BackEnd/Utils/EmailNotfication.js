const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('../Models/user');
const Event = require('../Models/event');

 async function sendUpcomingEventsEmail() {
    try {
       console.log('enteres');
        // Fetch upcoming events
        const today = new Date();
        const events = await Event.find({ date: { $gt: today } }).sort({ date: -1 });
        // Fetch user emails
        const userEmails = await getUserEmails();
       // console.log(userEmails);
        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'eventszoevents@gmail.com',
                pass: 'yaye wufq diry qodw'
            }
        });

        // Send emails to all users
        userEmails.forEach(email => {
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Upcoming Events Notification',
                html: composeEmail(events[0]) // Sending details of the first upcoming event
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error occurred:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });
    } catch (error) {
        console.error('Error sending emails:', error);
    }
}

// Define cron job to send emails every day at a specific time (e.g., 9:00 AM)


// Fetch user emails (example)
async function getUserEmails() {
    // Fetch user emails from database or any other source
   try {
       const emails = [];
       const users = await User.find();
       console.log(users);
       users.forEach(user => {
           emails.push(user.email);
       });  
       return emails;

   } catch (error) {
       console.log(error);
   }
}

// Compose email template
function composeEmail(event) {
    return `
        <h2>Upcoming Event: ${event.name}</h2>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Description: ${event.description}</p>
        <p>For more details, visit our website.</p>
    `;
}

module.exports ={
       sendUpcomingEventsEmail
}