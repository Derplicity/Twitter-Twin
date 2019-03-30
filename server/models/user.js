const mongoose = require('mongoose');

const User = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	tokenSecret: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', User);
