const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  prefix: process.env.BOT_PREFIX || '',
  ownerID: process.env.BOT_OWNER_ID || '',
  token: process.env.DISCORD_API_TOKEN || '',
  reddit: {
    userAgent: process.env.REDDIT_USER_AGENT || '',
    clientId: process.env.REDDIT_CLIENT_ID || '',
    clientSecret: process.env.REDDIT_CLIENT_SECRET || '',
    refreshToken: process.env.REDDIT_REFRESH_TOKEN || '',
  }
};
