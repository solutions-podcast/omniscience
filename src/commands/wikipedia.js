// Altered from https://github.com/wikipedia-bot/wikipedia-bot/blob/master/modules/requests.js

const { Command } = require('discord-akairo');
const wiki = require('wikijs').default;

class PingCommand extends Command {
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
    const wikiClient = wiki({
      apiUrl: `https://${lang}.wikipedia.org/w/api.php`,
    });

    const { results } = await wikiClient.search(query);

    if (results.length === 0) {
      return message.reply(`No Wikipedia results found for ${query}`);
    }
    const wikiPage = await wikiClient.page(results[0]);

    const wikiPageData = await Promise.all([
      wikiPage.raw.title,
      wikiPage.raw.fullurl,
      wikiPage.mainImage(),
      wikiPage.summary(),
    ]);

    let shortenedSummary = wikiPageData[3].split('\n');
    shortenedSummary = shortenedSummary.slice(0, 2);
    shortenedSummary = shortenedSummary.toString().substring(0, 768) + '...';

    await message.channel.send({
      embed: {
        color: 3447003,
        author: {
          icon_url:
            'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
          name: 'Wikipedia',
        },
        thumbnail: {
          url: wikiPageData[2],
        },
        title: wikiPageData[0],
        url: wikiPageData[1],
        description: shortenedSummary,
        timestamp: new Date(),
        footer: {
          icon_url:
            'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
          text: 'Content by wikipedia.org',
        },
      },
    });
  }
}

module.exports = PingCommand;

// https://github.com/wikipedia-bot/wikipedia-bot/blob/master/modules/requests.js
