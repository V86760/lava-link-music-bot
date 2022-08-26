
module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {

        client.user.setActivity(client.config.activity || "Music Bot", {
            type: client.config.activityType || 'WATCHING',
            name: client.config.activity || "Music Bot"
        });

        client.musicManager.init(client.user.id)


        console.log(`[LOG] ${client.user.tag} is now online!`);
        console.log(`[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers`);
        console.log(`[LOG] Bot serving ${client.users.cache.size} users`);
    }
}
