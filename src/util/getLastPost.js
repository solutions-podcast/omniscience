// we might eventually update this to include some posts from the bot,
// like if the bot posts a news article.
// or better yet, we could listen for replies on bot messages

async function getLastPost(channel) {
  const messages = (await channel.messages.fetch({limit: 3}))
    .array()
    .filter(m => m.author.id !== channel.client.user.id);
  return messages[1];
}

module.exports = { getLastPost }
