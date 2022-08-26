module.exports = {
    name: "support",
    category: "Misc",
    description: "View Our Support Server",
    ownerOnly: false,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let embed = new MessageEmbed()
        .setTitle('ℹ️ | Support Server')
        .setDescription(`You may join our support server by\n [Pressing Here](${client.config.supportServerLink})`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        await interaction.reply({embeds: [embed]})
    },
};
