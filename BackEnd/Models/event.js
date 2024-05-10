const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    attendeesLimit: {
       type: Number,
       required: true
   },
   images:[
    {
           type:String  
    }
    ],
    bookedUsers: [{
        type: String
    }]

});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
