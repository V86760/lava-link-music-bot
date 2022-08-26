module.exports = {
    name: "setrole",
    category: "Admin",
    description: "Setup the DJ role",
    ownerOnly: false,
    options: [{
        name: 'role',
        description: "What role do you want?",
        type: "ROLE",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let role = interaction.options.getRole('role')

        let db = require('../../../../schema/guildBLSchema')
        const database = await db.findOne({GuildID: interaction.guild.id})


        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `You are missing the permission \`ADMINISTRATOR\``, ephemeral: true})
        }

        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | Role Updated')
        .setDescription(`You have updated the \`DJROLE\` to ${role}`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})

        await database.updateOne({djRole: role}).catch(() => {})



    },
};
