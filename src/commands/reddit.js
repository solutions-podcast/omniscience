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

    let searchResults;
    if(query.length > 0) {
      searchResults = await r.search({
        query,
        subreddit,
        restrictSr: true,
        limit: 5
      });
    }
    else {
      searchResults = await r.getSubreddit(subreddit).getHot({limit: 3});
    }

    // TODO: If subreddit doesn't exist, return error message

    return message.channel.send({
      embed: {
        color: '#ff5500',
        author: {
          icon_url: 'https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png',
          name: `Reddit`,
        },
        url: `https://reddit.com/r/${subreddit}`,
        fields: [
          {
            name: query.length > 0 ? `/r/${subreddit} search: "${query}"` : `Hot posts in /r/${subreddit}`,
            value: searchResults.map(formatPost).join('\n')
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: 'https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png',
          text: 'Source: reddit.com'
        }
      }
    });
  }
}

module.exports = RedditCommand;
