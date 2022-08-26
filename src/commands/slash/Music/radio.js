module.exports = {
    name: "radio",
    category: "Music",
    description: "Toggle the 24/7 radio on your server!",
    ownerOnly: false,
    requireSameVC: false,
    options: [{
        name: 'option',
        description: "toggle the radio on your server.",
        type: 'BOOLEAN',
        required: true,
    }, {
        name: 'channel',
        description: "Where do you want me to go?",
        type: 'CHANNEL',
        required: true
    }],
    run: async (client, interaction) => {
        const { MessageEmbed } = require('discord.js')
        let player = client.musicManager.get(interaction.guild.id)
        let option = interaction.options.getBoolean('option')
        const vcChannel = interaction.options.getChannel('channel').id
        const res = await client.musicManager.search('https://www.youtube.com/watch?v=05689ErDUdM', interaction.user)

        let db = require('../../../../schema/guildBLSchema')
        let database = await db.findOne({GuildID: interaction.guild.id})

        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `You are missing the permission \`ADMINISTRATOR\``, ephemeral: true})
        }

        if(option) {

            const channel = interaction.member?.voice?.channel;
            if(interaction.guild.me?.voice?.channelId) {
                if(channel.id !== interaction.guild.me?.voice?.channelId) {
                    return interaction.reply({content: `You must be in the same voice channel as i am`, ephemeral: true})
                }
            }
            
            try {

            
            player = await client.musicManager.create({
                guild: interaction.guild.id,
                voiceChannel: vcChannel,
                textChannel: interaction.channel.id
            })

            player.connect()
            player.queue.add(res.tracks[0])
            player.play()
            database.updateOne({radio: true}).catch(() => {})
            



            let embed = new MessageEmbed()
            .setTitle(':white_check_mark: | Radio Active')
            .setDescription('I\'ll take over the DJing for now!')
            .setColor(client.config.embedColor)
            .setFooter({text: client.config.embedfooterText})
            return interaction.reply({embeds: [embed]})
        } catch(error) {
            interaction.reply({content: `Please state a voice channel.`, ephemeral: true})
        }
        } else {
            try {
            database.updateOne({radio: false}).catch(() => {})
                await player.destroy()
    
                let embed = new MessageEmbed()
                .setTitle(':white_check_mark: | Radio Ended Successfully')
                .setDescription('Fine, you take over.')
                .setColor(client.config.embedColor)
                .setFooter({text: client.config.embedfooterText})
                interaction.reply({embeds: [embed]})
            } catch(e) {
                interaction.reply({content: 'im not in a vc.', ephemeral: true})
            } 
        }
    },
};
