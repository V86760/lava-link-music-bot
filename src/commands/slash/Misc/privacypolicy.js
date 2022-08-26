module.exports = {
    name: "privacypolicy",
    category: "Misc",
    description: "View Our Privacy Policy",
    ownerOnly: false,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let embed = new MessageEmbed()
        .setTitle('ℹ️ | Privacy Policy')
        .setDescription(`You may view our Privacy Policy by\n [Pressing Here](${client.config.privacypolicyLink})`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        await interaction.reply({embeds: [embed]})
    },
};
