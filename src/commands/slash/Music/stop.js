module.exports = {
    name: "stop",
    category: "Music",
    description: "Stops the music",
    ownerOnly: false,
    requireSameVC: true,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let player = client.musicManager.get(interaction.guild.id)
        const autoplay = player.get('autoplay')
        
        if(!player) {
            return interaction.reply({content: `Please play a song before doing this action.`, ephemeral: true})
        }

        if(autoplay) {
            player.set('autoplay', false)
        }

        player.stop()
        player.queue.clear();

        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | Stooped Successfully')
        .setDescription('The music was stopped!')
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})


    },
};
