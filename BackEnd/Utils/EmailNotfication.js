const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User  = require('../Models/user')
const Event  = require('../Models/event')


// Fetch upcoming events (example)
const upcomingEvents = [];
const today = new Date()

const events  = await Event.find({date:{$gt:today}}).sort(1)

// Fetch user emails (example)
const getUserEmails = async() => {
    // Fetch user emails from database or any other source
    const emails = []
    const users =await User.find()
    users.map((user)=>{
       emails.push(user.email)
    })
    return emails
};

// Compose email template
const composeEmail = (event) => {
    return `
        <h2>Upcoming Event: ${event.name}</h2>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Description: ${event.description}</p>
        <p>For more details, visit our website.</p>
    `;
};

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

// Define cron job to send emails every day at a specific time (e.g., 9:00 AM)
cron.schedule('0 9 * * *', () => {
    // Fetch user emails
    const userEmails = getUserEmails();

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
}, {
    timezone: 'Your timezone' // Specify your timezone
});
