const discord = require('discord.js')
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports.config = {
    description: 'Reply to a suggestion',
    usage: '[message id] [reply]',
    aliases: [''],
    category: 'Utility'
  }
  module.exports.run = async (client, message, args, bot) => {
    let channel = `${process.env.suggestionChannel}`
     
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`I don't think that was a message ID!`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`You forgot to specify message ID!`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`You forgot to specify the reply!`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
    .setDescription(`I successfully replied to the suggestion!`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
    .setDescription(`I couldn't find that suggestion channel!`)
    .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
    .setDescription(`I couldn't find that suggestion.`)
    .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`I couldn't find that suggestion.`)
      .setColor("RANDOM")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("RANDOM")
      .addField(`Reply from ${message.author.tag}`, replyQuery)
      .setFooter("Status: Replied")
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`You have gotten a reply to your suggestion!. **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("RANDOM")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }