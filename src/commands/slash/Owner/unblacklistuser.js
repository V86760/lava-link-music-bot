module.exports = {
    name: "unblacklistuser",
    category: "Owner",
    description: "Allow a user to use the bot again.",
    ownerOnly: true,
    options: [{
        name: 'user',
        description: "Who do you want to unblacklist?", 
        type: "USER",
        required: false
    }, {
        name: 'userid',
        description: "What is the ID of the user you're trying to unblacklist?",
        type: "STRING",
        required: false
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let user = interaction.options.getUser('user')
        let userI = interaction.options.getString('userid')


       let db = require('../../../../schema/userBLSchema')
        
        let embed = new MessageEmbed()
        .setTitle('⚠️ | Blacklist Successful')
        .setDescription(`You have unblacklisted ${user || userI}`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        
        if(user) {
            let getUser = await db.findOne({UserID: user.id})
            if(!getUser) {
                getUser = db.create({
                    UserID: user.id,
                    Blacklisted: false
                }).save()
                return interaction.reply({embeds: [embed]})
            } else {
                if(!getUser.Blacklisted) {
                    await interaction.reply({content: "That user is not blacklisted.", ephemeral: true})
                }
                await getUser.updateOne({Blacklisted: false}).catch(() => {})
                return interaction.reply({embeds: [embed]})
            }
        } else {
            let userID = await db.findOne({UserID: userI})
            if(!userID) {
                userID = db.create({
                    UserID: userI,
                    Blacklisted: false
                }).save()
                return interaction.reply({embeds: [embed]})
            } else {
                if(!userID.Blacklisted) {
                    interaction.reply({content: "That user is not blacklisted.", ephemeral: true})
                }
                await userID.updateOne({Blacklisted: false}).catch(() => {})
                 return interaction.reply({embeds: [embed]})
            }
        }

    },
};
