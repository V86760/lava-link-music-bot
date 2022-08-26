module.exports = {
    name: "donate",
    category: "Misc",
    description: "View Our Donation Link",
    ownerOnly: false,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let embed = new MessageEmbed()
        .setTitle('ℹ️ | Donations')
        .setDescription(`If you\'re feeling generous, feel free to donate by\n [Pressing Here](${client.config.donationLink})`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        await interaction.reply({embeds: [embed]})
    },
};
