// Altered from https://github.com/wikipedia-bot/wikipedia-bot/blob/master/modules/requests.js

const { Command } = require('discord-akairo');
const { getWikiEmbed } = require('../util/wiki');

class RationalWikiCommand extends Command {
  constructor() {
    super('rationalwiki', {
      aliases: ['rw', 'rationalwiki'],
      args: [{ id: 'query', match: 'rest' }],
    });
  }

  async exec(message, { query }) {
    await message.channel.send(
      await getWikiEmbed(
        query,
        `https://rationalwiki.org/w/api.php`,
        'RationalWiki',
        'https://rationalwiki.org/w/images/6/6e/Rw_logo.png'
      )
    );
  }
}

module.exports = RationalWikiCommand;
