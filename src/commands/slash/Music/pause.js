module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the music",
    ownerOnly: false,
    requireSameVC: true,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let player = client.musicManager.get(interaction.guild.id)
        const song = player.queue.current

        
        if(!player) {
            return interaction.reply({content: `Please play a song before doing this action.`, ephemeral: true})
        }

        if(!player.pause) {
            return interaction.reply({content: `The music is already paused`, ephemeral: true})
        }


        player.pause(true)

        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | Paused Successfully')
        .setDescription(`**Paused:**\n [${song.title}](${song.uri})`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})


    },
};
