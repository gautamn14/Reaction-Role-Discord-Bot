const Discord = require("discord.js");
const moment = require('moment')
const db = require('quick.db')
const color = "0xadadad"

module.exports.run = async (bot, message, args) => {
  message.delete()
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return 

  const pc = message.guild.roles.find('name', 'Personal Computer:PC')  
  const xbox = message.guild.roles.find('name', 'Xbox')
  const ps = message.guild.roles.find('name', 'Playstation')
  const com = message.guild.roles.find('name', 'Competitive Players')  
  const cas = message.guild.roles.find('name', 'Casual Players')
  const eu = message.guild.roles.find('name', 'Europe')
  const nae = message.guild.roles.find('name', 'NA East')
  const naw = message.guild.roles.find('name', 'NA West')

  db.set(`channel`, message.channel.id)
  
  const embed = new Discord.RichEmbed()
  .setColor(color)
  .setAuthor(`Auto Assign Roles`, 'https://cdn.discordapp.com/avatars/471080476031844353/dec4d1918bb13601729c4610b8f0f6d5.webp?size=128')
  .setDescription(`To recieve roles, react with the corresponding emoji.\nTo remove a role remove your reaction below\n\n1⃣  **for ${pc}\n2⃣ for ${xbox}\n3⃣ for ${ps}\n4⃣ for ${com}\n5⃣ for ${cas}\n6⃣ for ${eu}\n7⃣ for ${nae}\n8⃣ for ${naw}**`)
  
  const msg = await message.channel.send(embed)
  
  await msg.react('1⃣')
  await msg.react('2⃣')
  await msg.react('3⃣')
  await msg.react('4⃣')
  await msg.react('5⃣')
  await msg.react('6⃣')
  await msg.react('7⃣')
  await msg.react('8⃣')
}

module.exports.help = {
    name: "message",
}