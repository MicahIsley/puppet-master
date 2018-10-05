var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var WishSchema = new Schema({
	user: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	note: {
		type: String
	}
});

var Wish = mongoose.model("Wish", WishSchema);
module.exports = Wish;