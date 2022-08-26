const mongo = require('mongoose');

const userBLSchema = new mongo.Schema({
    UserID: String,
    Blacklisted: Boolean
})

module.exports = mongo.model('blacklist', userBLSchema)