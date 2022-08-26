module.exports = {
    name: "lyrics",
    category: "Music",
    description: "View the lyrics to a song",
    ownerOnly: false,
    requireSameVC: false,
    options: [{
        name: 'songtitle',
        description: "Title of the song",
        type: "STRING",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        const song = interaction.options.getString('songtitle')
        const axios = require('axios')
        await interaction.deferReply()
        
        function substring(length, value) {
            const replaced = value.replace(/\n/g, '--')
            const regex = `.{1,${length}}`
            const lines = replaced.match(new RegExp(regex, "g")).map(line => line.replace('--', '\n'))
            return lines
        }

        const url = new URL('https://some-random-api.ml/lyrics')
        url.searchParams.append('title', song)

        try {
            const { data } = await axios.get(url.href)

            const embeds = substring(2048, data.lyrics).map((value, index) => {
                const isFirst = index === 0

                return new MessageEmbed({title: isFirst ? `${data.title} - ${data.author}` : null,
                thumbnail: isFirst ? data.thumbnail.genius : null,
                description: value,
                color: client.config.embedColor
            })
            })

            interaction.followUp({ embeds })
        } catch(e) {
            interaction.followUp({content: `Sorry, i was not able to find lyrics to that song`, ephemeral: true })
        }




    },
};
