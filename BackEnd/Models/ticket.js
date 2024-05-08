const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Ticket Schema
const ticketSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default:1
    },
    sold: {
        type: Number,
        default: 0
    },
    confirmed: {
        type:Boolean,
        default:false
    }
});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
