const mongoose = require(`mongoose`);

const NewsletterSubscriber = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model(`NewsletterSubscriber`, NewsletterSubscriber);