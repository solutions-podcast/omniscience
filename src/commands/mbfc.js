// three ways:
// 1. no args - checks the last post
// 2. name of a site
// 3. url

const { Command } = require('discord-akairo');
const { getLastPost } = require('../util/getLastPost');
const { mbfcFromURL } = require('../util/mbfc');

class MbfcCommand extends Command {
  constructor() {
    super('mbfc', {
      aliases: ['mbfc', 'mediabias'],
      args: [{ id: 'input', match: 'content' }],
    });
  }

  async exec(message, { input }) {
    // const lastPost = await getLastPost(message.channel);
    // return message.reply(lastPost.content);
    try {
      const result = mbfcFromURL(input);
      console.log(result);
      return message.channel.send(result);
    } catch {
      return message.channel.send(`No MBFC result found for "${input}"`);
    }
  }
}

module.exports = MbfcCommand;
