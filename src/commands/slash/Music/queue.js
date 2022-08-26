module.exports = {
    name: "queue",
    category: "Music",
    description: "View The Current Queue",
    ownerOnly: false,
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        const ms = require('ms-prettify').default;
        const load = require("lodash");

        const player = client.musicManager.get(interaction.guild.id)
        const tracks = player.queue

        if(!player) {
            return interaction.reply({content: `Please play a song before doing this action.`, ephemeral: true})
        }

        if(!player.queue) {
            return interaction.reply({content: `Nothing is playing right now.`, ephemeral: true})
        }

        if(!player.queue.length === '0' || !player.queue.length) {
            let embed = new MessageEmbed()
            .setTitle(`Queue for ${interaction.guild.name} - [ ${player.queue.length}]`, interaction.guild.iconURL({dynamic: true}))
            .setDescription(`Currently Playing:\n \`${tracks.current.title}\``)
            .setColor(client.config.embedColor)
            .setFooter({text: client.config.embedfooterText})
            interaction.reply({embeds: [embed]})
        } else {
           if(tracks.length < 11) {
            let qList = []
            var maxTracks = 10
            for (let i = 0; i < tracks.length; i += maxTracks) {
                let songs = tracks.slice(i, i + maxTracks) 
                qList.push(songs.map((track, index) => `**\` ${i + ++index}. \`${track.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : ms(track.duration).split(` | `)[0]}\`\n> *Requested by: __${track.requester.tag}__*`).join(`\n`))
            }
                let embed = new MessageEmbed()
                .setTitle(`Queue for ${interaction.guild.name} - [${player.queue.length}]`, interaction.guild.iconURL({dynamic: true}))
                .addField(`**\` N. \` *${tracks.length > maxTracks ? tracks.length - maxTracks : tracks.length} other Tracks ... ***`, '\u200b')
                .setColor(client.config.embedColor)
                .addField(`**\` 0. \` __CURRENT TRACK__**`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})`: player.queue.current.title}** - \`${player.queue.current.isStream ? `LIVE STREAM` : ms(player.queue.current.duration).split(` | `)[0]}\`\n> *Requested by: __${player.queue.current.requester.tag}__*`)
                interaction.reply({embeds: [embed]})
                
            


           }
        }

        

    },
};
