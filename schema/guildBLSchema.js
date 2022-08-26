const mongo = require('mongoose');

const guildBlSchema = new mongo.Schema({
    GuildID: String,
    Blacklisted: Boolean,
    djRole: String,
    requireDj: Boolean,
    announcements: Boolean,
    announcementsChannel: String,
    radio: Boolean,
})

module.exports = mongo.model('guildBLSchema', guildBlSchema)