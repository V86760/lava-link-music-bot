const { readdirSync } = require("fs");



module.exports = {
    name: "help",
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: 'What command do you need help',
            type: 'STRING',
            required: false
        }
    ],
    category: "Bot",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,
    run: async (client, interaction) => {

        const commandInt = interaction.options.getString("command");
        if (!commandInt) {

   
            const botCommandsList = [];
            readdirSync(`${client.cwd}/src/commands/slash/Bot`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/slash/Bot/${file}`);
                const name = `\`${filen.name}\``;
                botCommandsList.push(name);
            });

       
            const utilityCommandsList = [];
            readdirSync(`${client.cwd}/src/commands/slash/Utility`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/slash/Utility/${file}`);
                const name = `\`${filen.name}\``;
                utilityCommandsList.push(name);
            });

            const musicCommandsList = [];
            readdirSync(`${client.cwd}/src/commands/slash/Music`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/slash/Music/${file}`);
                const name = `\`${filen.name}\``;
                musicCommandsList.push(name);
            });

            const miscCommandList = [];
            readdirSync(`${client.cwd}/src/commands/slash/Misc`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/slash/Misc/${file}`);
                const name = `\`${filen.name}\``;
                miscCommandList.push(name);
            });

            const adminCommandList = [];
            readdirSync(`${client.cwd}/src/commands/slash/Admin`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/slash/Admin/${file}`);
                const name = `\`${filen.name}\``;
                adminCommandList.push(name);
            });

            const ownerCommandList = [];
            readdirSync(`${client.cwd}/src/commands/slash/Owner`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/slash/Owner/${file}`);
                const name = `\`${filen.name}\``;
                ownerCommandList.push(name);
            });

            const helpEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} SlashHelp`)
                .setDescription(` Hello **<@${interaction.member.id}>**, I am <@${client.user.id}>.  \nYou can use \`/help <slash_command>\` to see more info about the SlashCommands!\n**Total SlashCommands:** ${client.slash.size}`)
                .addField("🤖 - Bot SlashCommands", botCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🛠 - Utility SlashCommands", utilityCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🎵 - Music SlashCommands", musicCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("‼️ - Admin SlashCommands", adminCommandList.map((data) => `${data}`).join(", "), true)
                .addField("✨ - Miscellaneous SlashCommands", miscCommandList.map((data) => `${data}`).join(", "), true)
                .addField("👑 - Owner SlashCommands", ownerCommandList.map((data) => `${data}`).join(", "), true)
                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [helpEmbed] });
        } else {
            const command = client.slash.get(commandInt.toLowerCase());

            if (!command) {
                interaction.reply({ content: `There isn't any SlashCommand named "${commandInt}"` });
            } else {


                let command = client.slash.get(commandInt.toLowerCase());
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` SlashCommand`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpCmdEmbed] });
            }
        }
    },
};
