module.exports = {
    name: "fastforward",
    category: "Music",
    description: "fastforward the music",
    ownerOnly: false,
    requireSameVC: true,
    options: [{
        name: 'time',
        description: "What time would you like to FFW to?",
        type: "NUMBER",
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        const ms = require('ms-prettify').default;


        let player = client.musicManager.get(interaction.guild.id)
        let time = interaction.options.getNumber('time') * 1000
        let seekTime = Number(player.position) + Number(time)

        
        if(!player) {
            return interaction.reply({content: `Please play a song before doing this action.`, ephemeral: true})
        }

        if(Number(time) <= 0) seekTime = Number(player.position)

        if (Number(seekTime) >= player.queue.current.duration) seekTime = player.queue.current.duration - 1000;

        player.seek(Number(seekTime))

        
        let embed = new MessageEmbed()
        .setTitle(':white_check_mark: | FFW')
        .setDescription(`I have FFW to \`${ms(seekTime)}\``)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})
        interaction.reply({embeds: [embed]})


    },
};
