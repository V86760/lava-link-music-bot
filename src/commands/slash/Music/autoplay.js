module.exports = {
    name: "autoplay",
    category: "Music",
    description: "Toggle Music Autopaly",
    ownerOnly: false,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        const player = client.musicManager.get(interaction.guild.id)

        const { channel}  = interaction.member.voice

        if(!channel) return interaction.reply({content: `You must be in a voice channel`})

        if(!player) {
            return interaction.reply({content: `Please play a song before doing this action.`, ephemeral: true})
        }

        const autoplay = player.get('autoplay')


        if(autoplay) {
            player.set('autoplay', false)
            let embed = new MessageEmbed()
            .setTitle('🥁 | Autoplay Updated')
            .setDescription('Autoplay was toggled \`off\`')
            .setColor(client.config.embedColor)
            .setFooter({text: client.config.embedfooterText})
            return interaction.reply({embeds: [embed]})
        } else {
            const identifier = player.queue.current.identifier;
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;

            player.set("autoplay", true);
            player.set("requester", interaction.user);
            player.set("identifier", identifier);

            let res = await player.search(search, interaction.user)
            player.queue.add(res.tracks[1])
            let embed = new MessageEmbed()
            .setTitle('🥁 | Autoplay Updated')
            .setDescription('Autoplay was toggled \`on\`')
            .setColor(client.config.embedColor)
            .setFooter({text: client.config.embedfooterText})
            return interaction.reply({embeds: [embed]})

            
        }
    },
};
