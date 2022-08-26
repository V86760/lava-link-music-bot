const { Structure, Manager, Player } = require("erela.js");
const { Client } = require("discord.js")
const { nodes, SpotifyID, SpotifySecret } = require("../config");
const yaml = require('js-yaml')
const fs = require('fs');
let config = yaml.load(fs.readFileSync(`${process.cwd()}/application.yml`, ('utf8')))
let node = config.server.port

Structure.extend("Player", (Player) => class extends Player {
    constructor(...args) {
        super(...args)

        this.speed = 1
        this.pitch = 1;
        this.rate = 1;
        this._8d = false;
        this.nightcore = false;
        this.vaporwave = false;
        this.bassboost = false;
        this.distortion = false;
    }

    set8d(value) {
        this._8d = value

        if(this._8d) {
            this.node.send({
                op: "filters",
                guildid: this.guild,
                rotation: {
                    rotationHz: 0.2
                }
            })
        } else {
            this.node.send({
                op: "filters",
                guildid: this.guild,
                rotation: {
                    rotationHz: 0.0
                }
            })
        }
        return this
    }

    
})