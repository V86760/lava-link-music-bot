#!/usr/bin/env node
// -*- coding: utf-8 -*-

console.clear();
console.debug(`Booting up…`);

const Discord = require('discord.js');
const { Client, Collection, Intents, MessageEmbed } = Discord;

const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify');

const handler = require("./src/handlers/index");
const yaml = require('js-yaml')
const fs = require('fs');
const musicConfig = yaml.load(fs.readFileSync(`${process.cwd()}/application.yml`, ('utf8')))
const mongoose = require('mongoose')

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});


require('dotenv').config();


client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config');
client.cwd = require('process').cwd(); // require('path').resolve(``);
client.musicConfig = musicConfig

let clientID = client.config.SpotifyID
let clientSecret = client.config.SpotifySecret


client.musicManager = new Manager({
    plugins: [
        new Spotify({
            clientID,
            clientSecret
        })
    ],
    nodes: [
        {
            host: 'localhost',
            port: 2333,
            password: 'youshallnotpass'
        },
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if(guild) guild.shard.send(payload)
    }
})

client.musicManager.on('nodeConnect', (node) => {
    console.log(`Connected to node ${node.options.identifier}`)
  })
  .on('nodeError', (node, error) => {
    console.log(`Node ${node.options.identifier} had an error ${error.message}`)
  })
  .on('trackStart', (player, track) => {
    
    let embed = new MessageEmbed()
    .setTitle('🎵 | Track Loaded')
    .setDescription(`Now Playing \`${track.title}\``)
    .setColor(client.config.embedColor)
    .setFooter({text: `Requested By ${player.queue.current.requester.tag}`})

    client.channels.cache.get(player.textChannel).send({embeds: [embed]})
  })
  .on('queueEnd', (player) => {
    client.channels.cache.get(player.textChannel).send(`The queue has ended!`)
    player.destroy()
  })

module.exports = client;


mongoose.connect(client.config.mongoURL, {
    useNewURLParser: true,
    UseUnifiedTopology: true
}).then(() => console.log(`Database connection created!`))

handler.loadEvents(client);
handler.loadSlashCommands(client);


process.on("uncaughtException", (err) => {
    console.error('Uncaught Exception:', err);
});

process.on("unhandledRejection", (reason, promise) => {
    if(reason.toString().includes('Interaction has already been acknowledged.')) return
    console.error("[FATAL] Possibly Unhandled Rejection at: Promise", promise, "\nreason:", reason.message);
});

client.on('raw', (d) => client.musicManager.updateVoiceState(d))
client.on('guildCreate', async (guild) => {

    guild.fetchAuditLogs({type: "BOT_ADD", limit: 1}).then(log => {

        let sendEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 | Thank you!')
        .setDescription(`Thank you for adding me to your guild \`${guild.name}\`!\n To use my commands, type \`/help\` in any channel that I have permissions to see!\n If you need support, please join our support server and open a ticket\n [Click Here](${client.config.supportServerLink})`)
        .setColor(client.config.embedColor)
        .setFooter({text: client.config.embedfooterText})

        log.entries.first().executor.send({embeds: [sendEmbed]}).catch(err => {console.log(err)})
    })


    let db = require('./schema/guildBLSchema')
    let getGuild = await db.findOne({GuildID: guild.id})
    console.log('here')

    if(!getGuild) {
        getGuild = new db({
            GuildID: guild.id,
            Blacklisted: false
        }).save()
    }
})


client.login(process.env.TOKEN);

