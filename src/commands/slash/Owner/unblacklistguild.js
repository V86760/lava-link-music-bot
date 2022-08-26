module.exports = {
    name: "unblacklistguild",
    category: "Owner",
    description: "unblacklist a guild",
    ownerOnly: true,
    options: [{
        name: "guild",
        description: "What is the ID of the guild you want to unblacklist?",
        type: "STRING",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let guild = interaction.options.getString('guild')

        let db = require('../../../../schema/guildBLSchema')
        let getGuild = await db.findOne({GuildID: guild})

        if(!getGuild) {
            return interaction.reply({content: `The bot is not in a guild with the ID of \`${guild}\``, ephemeral: true})
        }

        if(!getGuild.Blacklisted) {
            return interaction.reply({content: `That guild is not blacklisted`, ephemeral: true})
        }

        let embed = new MessageEmbed()
        .setTitle('⚠️ | Blacklist Successful')
        .setDescription(`You have blacklisted the guild \`${guild}\``)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})

        await getGuild.updateOne({Blacklisted: true}).catch(() => {})
    },
};
