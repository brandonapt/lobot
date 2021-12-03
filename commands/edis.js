module.exports.config = {
    description: 'guesses your thoughts about ed',
    usage: '',
    aliases: ['ed'],
    category: "Fun"
  }
  module.exports.run = async (bot, message, username, args, commandlist) => {
    if (!args[0]) {
       return bot.chat('You didnt give me a word to bully ed with.')
    }
    bot.chat('Ed is a ' + args[0])
  }