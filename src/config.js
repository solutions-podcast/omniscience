const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  prefix: process.env.BOT_PREFIX || '',
  ownerID: process.env.BOT_OWNER_ID || '',
  token: process.env.DISCORD_API_TOKEN || '',
};
