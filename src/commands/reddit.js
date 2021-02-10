const { Command } = require('discord-akairo');
const snoowrap = require('snoowrap');
const config = require('../config');

const TITLE_LENGTH = 100;
const shorten = (str) => str.length < TITLE_LENGTH ? str : str.substr(0, TITLE_LENGTH) + '...';

const formatPost = (post) => `• [${shorten(post.title)}](https://reddit.com${post.permalink}) (${post.score} points, ${post.num_comments} comments)`;

class RedditCommand extends Command {
  constructor() {
    super('reddit', {
      aliases: ['r', 'reddit'],
      args: [
        { id: 'input', match: 'content' },
      ],
    });
  }

  async exec(message, { input }) {
    const [subreddit, ...queryWords] = input.split(' ');
    const query = queryWords.join(' ');

    const r = new snoowrap(config.reddit);
    const searchResults = await r.search({
      query,
      subreddit,
      restrictSr: true,
      limit: 3
    });
    console.log(searchResults[0])
    console.log(searchResults[0].link)

    // TODO: If subreddit doesn't exist, return error message

    return message.channel.send({
      embed: {
        color: '#ff9900',
        author: {
          icon_url: '',
          name: `Reddit`,
        },
        thumbnail: {
          url: '',
        },
        // title: `Results from /r/${subreddit}: "${query}"`,
        url: `https://reddit.com/r/${subreddit}`,
        fields: [
          {
            name: `/r/${subreddit} search: "${query}"`,
            value: searchResults.map(formatPost).join('\n')
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: '',
          text: 'Source: reddit.com'
        }
      }
    });
  }
}

module.exports = RedditCommand;
