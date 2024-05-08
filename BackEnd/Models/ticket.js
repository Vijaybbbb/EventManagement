const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Ticket Schema
const ticketSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
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
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    available: {
        type: Number,
        default: this.quantity
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
