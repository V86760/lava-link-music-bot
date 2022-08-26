
module.exports = {
    name: 'guildCreate',

    /**
     * @param {Guild} guild 
     * @param {Client} client 
     */
    async execute(guild, client) {
        let db = require('../../../schema/guildBLSchema')
        let getGuild = db.findOne({GuildID: guild.id})

        if(!getGuild) {
            console.log('here')
            getGuild = new db({
                GuildID: guild.id,
                Blacklisted: false
            }).save()
        }
    }
}
