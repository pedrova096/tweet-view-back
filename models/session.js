var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    secret: String,
    user: String,
    token: String,
    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date, required: false }
});


module.exports = mongoose.model('Session', sessionSchema);