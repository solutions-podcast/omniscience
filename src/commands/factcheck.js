const { Command } = require('discord-akairo');
const { google } = require('googleapis');
const config = require('../config');
const { getLastPost } = require('../util/getLastPost');

const toEmbedField = (result) => ({
  name: `${result.text} (${result.claimant})`,
  value: result.claimReview.map(
    (review) =>
      `[${review.publisher.name}: ${review.textualRating}](${review.url})`
  ),
});

class FactCheckCommand extends Command {
  constructor() {
    super('factcheck', {
      aliases: ['factcheck', 'fc'],
      args: [{ id: 'input', match: 'content' }],
    });
  }

  async exec(message, { input }) {
    // Although the API doesn't accept URLs, we could maybe try to have it parse the URL for metadata
    // const lastPost = await getLastPost(message.channel);
    // return message.reply(lastPost.content);

    const query = input;

    if(query.indexOf('<') !== -1) {
      return message.channel.send('Hey! Don\'t use <angle brackets> in your command invocations! Try again.');
    }

    const factCheck = google.factchecktools({
      version: 'v1alpha1',
      auth: config.google.apiKey,
    });

    const { data } = await factCheck.claims.search({ query });
    const factCheckResults = data.claims;

    if (factCheckResults.length === 0) {
      return message.channel.send({
        embed: {
          color: '#ffffff',
          author: {
            icon_url: 'https://img-authors.flaticon.com/google.jpg',
            name: `Google Fact Check`,
          },
          url: `https://toolbox.google.com/factcheck/explorer/search;hl=en`,
          title: `No Fact Check results found for "${query}"`,
          timestamp: new Date(),
          footer: {
            icon_url: 'https://img-authors.flaticon.com/google.jpg',
            text: 'Source: toolbox.google.com/factcheck',
          },
        },
      });
    }

    return message.channel.send({
      embed: {
        color: '#f0f0f0',
        author: {
          icon_url: 'https://img-authors.flaticon.com/google.jpg',
          name: `Google Fact Check`,
        },
        title: `Fact Check results for "${query}"`,
        url: `https://toolbox.google.com/factcheck/explorer/search/${query.replace(
          ' ',
          '%20'
        )};hl=en`,
        fields: factCheckResults.slice(0, 4).map(toEmbedField),
        timestamp: new Date(),
        footer: {
          icon_url: 'https://img-authors.flaticon.com/google.jpg',
          text: 'Source: toolbox.google.com/factcheck',
        },
      },
    });
  }
}

module.exports = FactCheckCommand;
