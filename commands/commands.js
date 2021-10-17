const _ = require('lodash');

module.exports.config = {
    description: 'sends commands',
    usage: '',
    aliases: ['help'],
    category: "Information"
  }
  module.exports.run = async (bot, message, username, args, commandlist) => {

    let categories = _.groupBy(commandlist, c => c.config.category);
    for (const categoryName of Object.keys(categories)) {
        let category = categories[categoryName];
        let commandString = category.map(c => `\`!${c.name}${c.config.usage ? ` ${c.config.usage}` : ''}\` - ${c.config.description}`).join('\n');
        bot.chat(`____${categoryName}____`);
        bot.chat(`${commandString}`);
    }
  }