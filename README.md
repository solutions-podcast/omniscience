# Omniscience

![Omniscience Logo](./logo.jpg)

This is a bot that looks up useful research information on any topic. Primarily for use in the [Solutions](https://medium.com/solutions) Discord server but I'll probably let others use it too.

## Search Engines

- Wikipedia
- Merriam-Webster
- Reddit
- Reddit Wiki (getWikiPages())
- RationalWiki
- YouTube
  - Crash Course
  - Khan Academy
- Google Scholar
- ProPublica (Congress bills)
- Google Fact Check API
- Stocks (Alpha Vantage or Polygon)
- [SEP](https://github.com/AFFogarty/SEP-Bot/blob/master/reddit-bot/sep/sep_search_result.py#L25)
- Charity Navigator

## Other Useful Data

- Awesome Public Datasets
- Census.gov
- COVID Data
- Data.gov
- Logical Fallacies (Fallacy.in)
- [Our World In Data](https://github.com/owid)
- USASpending.gov (includes debt)
- US Bureau of Labor Statistics (unemployment, etc)
- World Bank

## Utilities

- MBFC (https://raw.githubusercontent.com/drmikecrowe/mbfcext/master/docs/v2/combined.json)
- Outline.com
- Sci-Hub

# Contributing

Soon we will have a Project set up inside this repo where you can look at our roadmap and find tasks to work on.

## Local development setup

1. Install Node.js.
2. Create a Discord server to use as a sandbox. This is where your development bot will live.
3. Go to the Discord Developer Portal and create a new bot. Invite this bot to your new server (it will be offline for now). Save the bot token for the next step.
4. Clone this repo
5. In the cloned repo, copy  `.env.example` to `.env` and fill in the following secrets:
  a. `BOT_PREFIX` = A prefix of your choice, e.g. `!`
  b. `DISCORD_API_TOKEN` = Your Discord bot token from the previous step
  c. Fill in any other API tokens necessary for what you're working on (e.g. a Reddit token if you're working on Reddit commands)
4. Run `npm install` in this directory
5. Run `npm run dev`
6. You should now see your bot online and ready to accept commands! Try sending it the "ping" command (your prefix + `ping`), and it should reply with "Pong".

### Reddit API
- https://www.reddit.com/prefs/apps
- https://github.com/reddit-archive/reddit/wiki/oauth2
- https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example
- https://not-an-aardvark.github.io/reddit-oauth-helper/
- https://not-an-aardvark.github.io/snoowrap/snoowrap.html
- https://www.reddit.com/dev/api/
