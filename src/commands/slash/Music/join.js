module.exports = {
    name: "join",
    category: "Music",
    description: "Have the bot join your VC!",
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

        if(player.state !== 'CONNECTED') {
            await player.connect()
            await player.stop()

            let embed = new MessageEmbed()
            .setTitle(':white_check_mark: | Joined Successfully')
            .setDescription('I have joined your VC!')
            .setColor(client.config.embedColor)
            .setFooter({text: client.config.embedfooterText})
            interaction.reply({embeds: [embed]})
        }
    },
};
