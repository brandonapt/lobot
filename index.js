require('dotenv')
const mineflayer = require('mineflayer')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client({
  allowedMentions: { parse: [] },
  intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});
let channel = '898982218133811290'
const commandlist = []
const token = process.env.token
const prefix = "!"
const RANGE_GOAL = 1 // get within this radius of the player

let isGuarding = false;
let guardPos = null

let discordList = [];
client.commandlist = discordList;

fs.readdir('./discord/', async (err, files) => {
  if(err){
      return console.log('An error occured when checking the commands folder for commands to load: ' + err);
  }
  files.forEach(async (file) => {
      if(!file.endsWith('.js')) return;
      let commandFile = require(`./discord/${file}`);
      discordList.push({
        file: commandFile,
        name: file.split('.')[0],
        config: commandFile.config
      });
  });
});






fs.readdir('./commands/', async (err, files) => {
  if(err){
      return console.log('An error occured when checking the commands folder for commands to load: ' + err);
  }
  files.forEach(async (file) => {
      if(!file.endsWith('.js')) return;
      let commandFile = require(`./commands/${file}`);
      commandlist.push({
        file: commandFile,
        name: file.split('.')[0],
        config: commandFile.config
      });
  });
});

client.on('ready', () => {
  console.log(`The discord bot logged in! Username: ${client.user.username}!`)
  channel = client.channels.cache.get(channel)
  if (!channel) {
    console.log(`I could not find the channel!`)
  }
})



const bot = mineflayer.createBot({
  host: 'localhost',
  username: 'Lobot'
})


bot.loadPlugin(pathfinder)

bot.on('chat', (username, message) => {
  // Ignore messages from the bot itself
  if (username === bot.username) return

})

bot.once('spawn', () => {
  console.log('Logged Into Server')
  mineflayerViewer(bot, { port: 1000, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)


  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    if(!message.startsWith(prefix)){
      return
    }
    let args = message.slice(prefix.length).split(' ');
    let commandName = args[0].toLowerCase();
    args.shift();
    if(!commandName){
      commandName = args[0].toLowerCase();
      args.shift();
    }
    let command = commandlist.find((cmd) => cmd.name === commandName);
    if(!command){
      command = commandlist.find((cmd) => cmd.config.aliases.includes(commandName));
      if(!command) return;
    }
    command.file.run(bot, message, username, args, commandlist);

  })
})


client.on('message', async (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(' ');
  const commandName = args[0].toLowerCase();
  args.shift();
  const command = client.commandlist.find((cmd) => cmd.name === commandName || cmd.config.aliases.includes(commandName));
  if(!command) return;


  
  

  command.file.run(client, message, args, bot);
});


// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)

client.login("Nzk1Mzc3NzM4NTYyNTM1NDY0.X_IfPg.43DvSnaw3YCJ1Ru8v5yyJ6k5k8I")