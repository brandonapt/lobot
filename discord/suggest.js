const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
 
const config = {
    description: 'Sends a suggestion for lobot.',
    aliases: [],
    usage: '[suggestion]',
    category: 'Utility'
}


module.exports = {
  config,
  
  run: async (client, message, args, bot) => {
   
  let channel = `${process.env.suggestionChannel}`
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Please Suggest Something.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("RANDOM")
       .setFooter("Status: Pending")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`Your suggestion was submitted to <#${channel}>\n\nNote: You may get a DM with a reply to your suggestion.`)
       .setColor("RANDOM")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
  }
}