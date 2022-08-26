module.exports = {
    name: "vote",
    category: "Misc",
    description: "Vote for our bot!",
    ownerOnly: false,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')

        let embed = new MessageEmbed()
        .setTitle('ℹ️ | Vote')
        .setDescription(`You may vote for us by\n [Pressing Here](${client.config.topGGVoteLink})`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        await interaction.reply({embeds: [embed]})
    },
};
