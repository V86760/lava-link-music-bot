module.exports = {
    name: "leave",
    category: "Music",
    description: "Have the bot leave your VC!",
    ownerOnly: false,
    requireSameVC: true,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let player = client.musicManager.get(interaction.guild.id)
        
        player = await client.musicManager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        })

        if(player.state == 'CONNECTED') {
            await player.destroy()

            let embed = new MessageEmbed()
            .setTitle(':white_check_mark: | Left Successfully')
            .setDescription('I have left your VC!')
            .setColor(client.config.embedColor)
            .setFooter({text: client.config.embedfooterText})
            interaction.reply({embeds: [embed]})
        } else {
            return interaction.reply({content: `I\'m not in a VC.`, ephemeral: true})
        }
    },
};
