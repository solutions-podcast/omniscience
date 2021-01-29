import * as dotenv from 'dotenv';
dotenv.config();

export default {
  prefix: process.env.BOT_PREFIX ?? '',
  ownerID: process.env.BOT_OWNER_ID ?? '',
  token: process.env.DISCORD_API_TOKEN ?? '',
};
