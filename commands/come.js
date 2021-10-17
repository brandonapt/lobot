const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
module.exports.config = {
    description: 'comes to you',
    usage: '',
    aliases: ['cometome'],
    category: "Utilities"
  }
  module.exports.run = async (bot, message, username, args, commandlist) => {
    const RANGE_GOAL = 1 // get within this radius of the player

    bot.loadPlugin(pathfinder)
    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)
    const target = bot.players[username]?.entity
    if (!target) {
        bot.chat("I don't see you !")
        return
      }
      const { x: playerX, y: playerY, z: playerZ } = target.position
  
      bot.pathfinder.setMovements(defaultMove)
      bot.pathfinder.goto(new GoalNear(target.position.x, target.position.y, target.position.z, 1), announceArrived)
      bot.chat('Coming...')

      function announceArrived () {
        const botPosition = bot.entity.position
        bot.chat(`Came!`)
      }
  }