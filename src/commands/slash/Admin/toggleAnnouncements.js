module.exports = {
    name: "toggleannouncements",
    category: "Admin",
    description: "Toggle announcements",
    ownerOnly: false,
    options: [{
        name: 'option',
        description: "What do you want to do?",
        type: "BOOLEAN",
        required: true
    }, {
        name: 'channel',
        description: "Where do you want the announcements to go?",
        type: "CHANNEL",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let option = interaction.options.getBoolean('option')
        let channel = interaction.options.getChannel('channel')

        let db = require('../../../../schema/guildBLSchema')
        const database = await db.findOne({GuildID: interaction.guild.id})


        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `You are missing the permission \`ADMINISTRATOR\``, ephemeral: true})
        }

        if(option) desc = `You have updated the \`Toggle Announcements\` to \`${option}\`, they will go to ${channel}`
        if(!option) desc = `You have updated the \`Toggle Announcements\` to \`${option}\``

        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | Announcements Toggled')
        .setDescription(desc)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})

        await database.updateOne({announcements: option}).catch(() => {})
        await database.updateOne({announcementsChannel: channel.id}).catch(() => {})



    },
};
