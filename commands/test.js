module.exports.config = {
    description: 'sends a test message',
    usage: '',
    aliases: ['send'],
    category: "Information"
  }
  module.exports.run = async (bot, message, username, args, commandlist) => {
    bot.chat('ok thius works. arg 1: ' + args[0])
  }