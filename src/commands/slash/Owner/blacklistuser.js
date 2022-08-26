module.exports = {
    name: "blacklistuser",
    category: "Owner",
    description: "Blacklist A User From Using The Bot",
    ownerOnly: true,
    options: [{
        name: 'user',
        description: "Who do you want to blacklist?", 
        type: "USER",
        required: false
    }, {
        name: 'userid',
        description: "What is the ID of the user you're trying to blacklist?",
        type: "STRING",
        required: false
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let user = interaction.options.getUser('user')
        let userI = interaction.options.getString('userid')
        let db = require('../../../../schema/userBLSchema')

        if(user.id == client.user.id) {
            return interaction.reply({content: `You cannot blacklist me.`, ephemeral: true})
        } 
        
        let embed = new MessageEmbed()
        .setTitle('⚠️ | Blacklist Successful')
        .setDescription(`You have blacklisted ${user || userI}`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        
        if(user) {
            let getUser = await db.findOne({UserID: user.id})
            if(!getUser) {
                await db.create({
                    UserID: user.id,
                    Blacklisted: true
                }).save()
                return interaction.reply({embeds: [embed]})
            } else {
                await getUser.updateOne({Blacklisted: true}).catch(() => {})
                return interaction.reply({embeds: [embed]})
            }
        } else {
            let userID = await db.findOne({UserID: userI})
            if(!userID) {
               await db.create({
                    UserID: userI,
                    Blacklisted: true
                }).save()
                return interaction.reply({embeds: [embed]})
            } else {
                await userID.updateOne({Blacklisted: true}).catch(() => {})
                return interaction.reply({embeds: [embed]})
            }
        }

    },
};
