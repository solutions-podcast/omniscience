// three ways:
// 1. no args - checks the last post
// 2. name of a site
// 3. url

const { Command } = require('discord-akairo');
const { getLastPost } = require('../util/getLastPost');
const { getMbfcEntry } = require('../util/mbfc');

class MbfcCommand extends Command {
  constructor() {
    super('mbfc', {
      aliases: ['mbfc', 'mediabias'],
      args: [{ id: 'input', match: 'content' }],
    });
  }

  async exec(message, { input }) {
    if(input.indexOf('<') !== -1) {
      return message.channel.send('Hey! Don\'t use <angle brackets> in your command invocations! Try again.');
    }

    try {
      if(!input) {
        const lastPost = (await getLastPost(message.channel)).toString();
        const url = lastPost.split(' ').find(word => word.startsWith('http'));
        if(url) {
          input = url;
        }
        else {
          throw 'No input given';
        }
      }
      const result = getMbfcEntry(input);
      return message.channel.send(result);
    } catch(e) {
      if(e === 'No input given') {
        return message.channel.send('No input given');
      }
      else if(e === 'No MBFC result found') {
        return message.channel.send(`No MBFC result found for "${input}"`);
      }
      else {
        console.error(e);
      }
    }
  }
}

module.exports = MbfcCommand;
