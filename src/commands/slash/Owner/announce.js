module.exports = {
    name: "announce",
    category: "Owner",
    description: "Send an announcement to all the servers",
    ownerOnly: true,
    options: [{
        name: 'title',
        description: 'What do you you want the title to be?',
        type: "STRING",
        required: true
    }, {
        name: 'description',
        description: 'What do you want the description to be?',
        type: "STRING",
        required: true
    }, {
        name: 'footer',
        description: 'What do you want the footer to be?',
        type: "STRING",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let title = interaction.options.getString('title')
        let description = interaction.options.getString('description')
        let footer = interaction.options.getString('footer')

        let db = require('../../../../schema/guildBLSchema')
        let database = await db.find({})
        
        database.forEach((guild) => {

            let announcementChannel = guild.announcementsChannel

            let embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setFooter({text: footer})
            .setColor(client.config.embedColor)

            let channel = client.channels.cache.get(announcementChannel)
            channel.send({embeds: [embed]})
        })

        let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setFooter({text: footer})
        .setColor(client.config.embedColor)


        interaction.reply({embeds: [embed]})


    },
};
