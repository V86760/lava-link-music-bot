
module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const { guild } = interaction
//GuildID
        let userDB = require('../../../schema/userBLSchema')
        let userDatabase = await userDB.findOne({UserID: interaction.user.id})

        let guildDB = require('../../../schema/guildBLSchema')
        let guildDatabase = await guildDB.findOne({GuildID: guild.id})

        if(!userDatabase) {
            userDatabase = new userDB({
                UserID: interaction.user.id
            }).save()
        }

        if(userDatabase.Blacklisted) {
            return interaction.reply({content: "You have been blacklisted from using this bot. If you think this is an error, join our support server\n " + `[Click here](${client.config.supportServerLink})`, ephemeral: true})
        }

        if(guildDatabase.Blacklisted) {
            return interaction.reply({content: "This guild has been blacklisted from using this bot. If you think this is an error, join our support server\n " + `[Click here](${client.config.supportServerLink})`, ephemeral: true})
        }

        if(guildDatabase.requireDj && guildDatabase.djRole) {
            if(!interaction.member.roles.cache.has(guildDatabase.djRoles) && !interaction.member.permissions.has('ADMINISTRATOR')) {
                return interaction.reply({content: `You must have the role <@&${guildDatabase.djRole}> to use commands!`, ephemeral: true})
            }
        }
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error check console' });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== client.config.ownerID) {
                return interaction.reply({ ephemeral: true, content: "This command only for Bot Owner!" });
            }
        }
        
        if(command.requireSameVC) {
            const channel = interaction.member?.voice?.channel
            if(interaction.guild.me?.voice?.channelId) {
                if(channel.id !== interaction.guild.me?.voice?.channelId) {
                    return interaction.reply({content: `You must be in the same voice channel as i am`, ephemeral: true})
                }
            }
        }

        if(command.category == 'Music') {
            if(guildDatabase.radio && command.name !== 'radio') {
                return interaction.reply({content: `The radio is currently playing.`, ephemeral: true})
            }
        }
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args);
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}
