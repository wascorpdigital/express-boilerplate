const mongoose = require(`mongoose`);

const OrderSchema = new mongoose.Schema({
    items: {
        type: [ Object ],
        required: true
    },
    invoice_link: {
        type: String,
        required: true,
        trim: true
    },
    payment_id: {
        type: String,
        required: true,
        trim: true
    },
    customer: {
        type: Object,
        required: true
    },
    guest_account: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    payment_option: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    payment_currency: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model(`Order`, OrderSchema);