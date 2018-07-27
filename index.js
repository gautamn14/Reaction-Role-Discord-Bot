const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const ms = require("ms");
const moment = require('moment');
const send = require(`quick.hook`)
const db = require('quick.db');
const bot = new Discord.Client();
const color = "0xadadad"
const fs = require('fs')
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
bot.commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {

    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('Couldnt find commands')
        return
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        bot.commands.set(props.help.name, props)
    })

})

bot.on("ready", function() {
    console.log("Ready");

    bot.user.setActivity('fornite (MYST)')

});

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

bot.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    bot.emit(events[event.t], reaction, user);
});

bot.on('messageReactionAdd', async (messageReaction, user) => {

    if (user.bot) return;

    const channel = await db.fetch('channel')

    if (messageReaction.message.channel.id === channel) {
        if (messageReaction.emoji.name === '1⃣') {
            const pc = messageReaction.message.guild.roles.find('name', 'Personal Computer:PC')
            messageReaction.message.guild.member(user).addRole(pc)
        }
        if (messageReaction.emoji.name === '2⃣') {
            const xbox = messageReaction.message.guild.roles.find('name', 'Xbox')
            messageReaction.message.guild.member(user).addRole(xbox)
        }
        if (messageReaction.emoji.name === '3⃣') {
            const ps = messageReaction.message.guild.roles.find('name', 'Playstation')
            messageReaction.message.guild.member(user).addRole(ps)

        }
        if (messageReaction.emoji.name === '4⃣') {
            const com = messageReaction.message.guild.roles.find('name', 'Competitive Players')
            messageReaction.message.guild.member(user).addRole(com)

        }
        if (messageReaction.emoji.name === '5⃣') {
            const cas = messageReaction.message.guild.roles.find('name', 'Casual Players')
            messageReaction.message.guild.member(user).addRole(cas)

        }
        if (messageReaction.emoji.name === '6⃣') {
            const eu = messageReaction.message.guild.roles.find('name', 'Europe')
            messageReaction.message.guild.member(user).addRole(eu)

        }
        if (messageReaction.emoji.name === '7⃣') {
            const nae = messageReaction.message.guild.roles.find('name', 'NA East')
            messageReaction.message.guild.member(user).addRole(nae)

        }
        if (messageReaction.emoji.name === '8⃣') {
            const naw = messageReaction.message.guild.roles.find('name', 'NA West')
            messageReaction.message.guild.member(user).addRole(naw)

        }
    }
});

bot.on('messageReactionRemove', async (messageReaction, user) => {
    if (user.bot) return;

    const channel = await db.fetch('channel')

    if (messageReaction.message.channel.id === channel) {
        if (messageReaction.emoji.name === '1⃣') {
            const pc = messageReaction.message.guild.roles.find('name', 'Personal Computer:PC')
            messageReaction.message.guild.member(user).removeRole(pc)
        }
        if (messageReaction.emoji.name === '2⃣') {
            const xbox = messageReaction.message.guild.roles.find('name', 'Xbox')
            messageReaction.message.guild.member(user).removeRole(xbox)
        }
        if (messageReaction.emoji.name === '3⃣') {
            const ps = messageReaction.message.guild.roles.find('name', 'Playstation')
            messageReaction.message.guild.member(user).removeRole(ps)

        }
        if (messageReaction.emoji.name === '4⃣') {
            const com = messageReaction.message.guild.roles.find('name', 'Competitive Players')
            messageReaction.message.guild.member(user).removeRole(com)

        }
        if (messageReaction.emoji.name === '5⃣') {
            const cas = messageReaction.message.guild.roles.find('name', 'Casual Players')
            messageReaction.message.guild.member(user).removeRole(cas)

        }
        if (messageReaction.emoji.name === '6⃣') {
            const eu = messageReaction.message.guild.roles.find('name', 'Europe')
            messageReaction.message.guild.member(user).removeRole(eu)

        }
        if (messageReaction.emoji.name === '7⃣') {
            const nae = messageReaction.message.guild.roles.find('name', 'NA East')
            messageReaction.message.guild.member(user).removeRole(nae)

        }
        if (messageReaction.emoji.name === '8⃣') {
            const naw = messageReaction.message.guild.roles.find('name', 'NA West')
            messageReaction.message.guild.member(user).removeRole  (naw)

        }
    }
});


bot.on("message", async (message) => {

    const PREFIX = "m/"

    if (message.author.bot) return;

    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase()
    let args = messageArray.slice(1)

    if (!message.content.startsWith(PREFIX)) return;

    let commandfile = bot.commands.get(cmd.slice(PREFIX.length))
    if (commandfile) commandfile.run(bot, message, args)

});
bot.login(process.env.TOKEN);