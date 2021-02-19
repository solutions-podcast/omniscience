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
    const [subredditName, ...queryWords] = input.split(' ');
    const query = queryWords.join(' ');

    const r = new snoowrap(config.reddit);

    const subreddit = await r.getSubreddit(subredditName).fetch().catch(() => {
      return undefined;
    });
    if(!subreddit) {
      return message.channel.send(`Subreddit /r/${subredditName} not found.`);
    }

    let searchResults;
    if(query.length > 0) {
      searchResults = await subreddit.search({
        query,
        limit: 4
      });
      if(searchResults.length === 0) {
        return message.channel.send(`No results found for ${query} in /r/${subredditName}`);
      }
    }
    else {
      searchResults = await subreddit.getHot({limit: 3});
    }


    return message.channel.send({
      embed: {
        color: '#ff5500',
        author: {
          icon_url: 'https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png',
          name: `Reddit`,
        },
        url: `https://reddit.com/r/${subredditName}`,
        fields: [
          {
            name: query.length > 0 ? `/r/${subredditName} search: "${query}"` : `Hot posts in /r/${subredditName}`,
            value: searchResults.map(formatPost).join('\n').substr(0, 1023)
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
