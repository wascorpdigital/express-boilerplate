const mongoose = require(`mongoose`),
	bcrypt = require(`bcryptjs`);

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		require: true
	},
	mobile_numbers: {
		type: [{
            country_code: String,
            phone_number: String
        }],
		default: []
	},
	admin: {
		type: Boolean,
        default: false
	},
	token: String,
	tokenExpiration: Date,
	active: {
		type: Boolean,
		default: false
	},
	wishlist: {
        type: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: []
    }
}, { timestamps: true });


UserSchema.methods.hashPassword = (password) => bcrypt.hashSync(password, 10);
UserSchema.methods.verifyPassword = (password) => bcrypt.compareSync(password, this.password);

module.exports = mongoose.model(`User`, UserSchema);