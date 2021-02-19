// Altered from https://github.com/wikipedia-bot/wikipedia-bot/blob/master/modules/requests.js

const { Command } = require('discord-akairo');
const { getWikiEmbed } = require('../util/wiki');

class WikipediaCommand extends Command {
  constructor() {
    super('wikipedia', {
      aliases: ['w', 'wikipedia'],
      args: [
        { id: 'lang', match: 'option', flag: 'lang:', default: 'en' },
        { id: 'query', match: 'rest' },
      ],
    });
  }

  async exec(message, { lang, query }) {
    if(query.indexOf('<') !== -1) {
      return message.channel.send('Hey! Don\'t use <angle brackets> in your command invocations! Try again.');
    }
    await message.channel.send(
      await getWikiEmbed(
        query,
        `https://${lang}.wikipedia.org/w/api.php`,
        'Wikipedia',
        'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png'
      )
    );
  }
}

module.exports = WikipediaCommand;
