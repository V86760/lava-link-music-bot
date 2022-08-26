

module.exports = {
    name: "play",
    category: "Music",
    description: "Play A Song!",
    ownerOnly: false,
    requireSameVC: true,
    options: [
        {
            name: 'song',
            description: "What song do you want to play?",
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        const song = interaction.options.getString('song')
        const res = await client.musicManager.search(song, interaction.user)
        const channel = interaction.member?.voice?.channel;

        if(!channel) return interaction.reply({content: `You must be in a voice channel`})


        try {

        if(res.loadType === "LOAD_FAILED") throw res.exception
        
        else if(res.loadType === "PLAYLIST_LOADED")  {
            player.queue.add(res.tracks)
            player.play()
        }

    } catch(e) {
        console.log(e)
    }
        
        const player = client.musicManager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        })

        player.connect()
        player.queue.add(res.tracks[0])

        let embed = new MessageEmbed()
        .setTitle('🎉 | Track Queued')
        .setDescription(`Queuing the track \`${res.tracks[0].title}\`.`)
        .setColor(client.config.embedColor)
        .setFooter({text: `Queued By ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})

        await interaction.reply({embeds: [embed]})

        if (!player.playing && !player.paused && !player.queue.size) player.play() 
    },
};
