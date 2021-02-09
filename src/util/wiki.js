const wiki = require('wikijs').default;

async function getWikiEmbed(query, apiUrl, siteName, iconUrl) {
  const wikiClient = wiki({
    apiUrl,
    headers: {
      'User-Agent':
        'Omniscience Discord Bot by Elias Jackson (https://github.com/FOSSforlife/omniscience)',
    },
    origin: siteName === 'Wikipedia' ? '*' : null,
  });

  const { results } = await wikiClient.search(query);

  if (results.length === 0) {
    return message.reply(`No results found for ${query}`);
  }
  const wikiPage = await wikiClient.page(results[0]);

  const wikiPageData = await Promise.all([
    wikiPage.raw.title,
    wikiPage.raw.fullurl,
    wikiPage.mainImage(),
    wikiPage.info(),
    wikiPage.summary(),
  ]);

  console.log(wikiPage);
  console.log(wikiPageData);
  let shortenedSummary = wikiPageData[3].split('\n');
  shortenedSummary = shortenedSummary.slice(0, 2);
  shortenedSummary = shortenedSummary.toString().substring(0, 768) + '...';

  return {
    embed: {
      color: 3447003,
      author: {
        icon_url: iconUrl,
        name: siteName,
      },
      thumbnail: {
        url: wikiPageData[2],
      },
      title: wikiPageData[0],
      url: wikiPageData[1],
      description: shortenedSummary,
      timestamp: new Date(),
      footer: {
        icon_url: iconUrl,
        text: `Source: ${apiUrl.split('/').slice(2, 3)}`,
      },
    },
  };
}

module.exports = { getWikiEmbed };
