module.exports = {
    name: "rep",
    category: "Misc",
    description: "Leave a vouch for us!",
    ownerOnly: false,
    options: [{
        name: "feedback",
        description: "What do you want to say about our bot?",
        type: "STRING",
        required: true
    }, {
        name: 'review',
        description: "Would you recommend this bot to others?",
        type: "BOOLEAN",
        required: true
    }, {
        name: 'stars',
        description: "how many stars would you give us?",
        type: "NUMBER",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let channel = client.channels.cache.get(client.config.repChannelID)
        let feedback = interaction.options.getString('feedback')
        let review = interaction.options.getBoolean('review')
        let stars = interaction.options.getNumber('stars')

        if(stars == 1) stars = '⭐'
        if(stars == 2) stars = '⭐⭐'
        if(stars == 3) stars = '⭐⭐⭐'
        if(stars == 4) stars = '⭐⭐⭐⭐'
        if(stars == 5) stars = '⭐⭐⭐⭐⭐'
        if(stars > 5) stars = '⭐⭐⭐⭐⭐'

        if(review) review = 'Yes'
        if(!review) review = 'No'

        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | Vouch Sent!')
        .addField('Your Thoughts:', `*${feedback}*`, true)
        .addField('Recommend to others?', `\`${review}\``, true)
        .addField('Stars:', `${stars}`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        await interaction.reply({embeds: [embed]})
        
        let repEmbed = new MessageEmbed()
        .setTitle('New Vouch From ' + interaction.user.tag)
        .addField('Their Thoughts:', `*${feedback}*`, true)
        .addField('Recommend to others?', `\`${review}\``, true)
        .addField('Stars:', `${stars}`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        channel.send({embeds: [repEmbed]}).catch((err) => {
            if(err) return console.log('You have not setup the rep channel')
        })
    },
};
