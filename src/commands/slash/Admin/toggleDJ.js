module.exports = {
    name: "toggledj",
    category: "Admin",
    description: "Toggle the DJ only permission",
    ownerOnly: false,
    options: [{
        name: 'option',
        description: "What do you want to do?",
        type: "BOOLEAN",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let option = interaction.options.getBoolean('option')

        let db = require('../../../../schema/guildBLSchema')
        const database = await db.findOne({GuildID: interaction.guild.id})


        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `You are missing the permission \`ADMINISTRATOR\``, ephemeral: true})
        }

        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | Permissions Updated')
        .setDescription(`You have updated the \`Toggle DJ Only\` to ${option}`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})

        await database.updateOne({requireDj: option}).catch(() => {})



    },
};
