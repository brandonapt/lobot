module.exports.config = {
    description: 'Sends the current bot ping.',
    usage: '',
    aliases: ['pong'],
    category: 'Information'
  }
  module.exports.run = async (client, message, args, bot) => {
    message.channel.send(`Pong! 🏓 Latency is ${Math.round(client.ws.ping)}ms`);
  }