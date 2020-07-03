const mongoose = require(`mongoose`);

const ProductSchema = new mongoose.Schema({
    images: {
        type: [ String ],
        default: []
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    on_discount: {
        type: Boolean,
        default: false
    },
    discounted_price: {
        type: Number,
        default: 0
    },
    variations: {
        type: [{
            variation_id: String,
            variation_name: String,
            variation_price: Number,
            active: Boolean,
            variation_addons: [{ type: mongoose.Schema.Types.ObjectId, ref: `addongroup` }]
        }],
        default: []
    },
    addons: [{ type: mongoose.Schema.Types.ObjectId, ref: `addongroup` }],
    in_stock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(`Product`, ProductSchema);