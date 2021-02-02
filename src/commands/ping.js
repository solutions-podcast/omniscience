const { Command } = require('discord-akairo');

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
    });
  }

  exec(message) {
    return message.reply('Pong!');
  }
}

module.exports = PingCommand;

// https://github.com/wikipedia-bot/wikipedia-bot/blob/master/modules/requests.js
