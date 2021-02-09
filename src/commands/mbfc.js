// three ways:
// 1. no args - checks the last post
// 2. name of a site
// 3. url

const { Command } = require('discord-akairo');
const { getLastPost } = require('../util/getLastPost');

class MbfcCommand extends Command {
  constructor() {
    super('mbfc', {
      aliases: ['mbfc', 'mediabias'],
    });
  }

  async exec(message) {
    const lastPost = await getLastPost(message.channel);
    return message.reply(lastPost.content);
  }
}

module.exports = MbfcCommand;

