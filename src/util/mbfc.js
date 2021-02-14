// TODO: Make this into an NPM package

const { aliases, sources } = require('./mbfc-data.json');

const reportingScale = {
  VH: 'Very High',
  H: 'High',
  MF: 'Mostly Factual',
  M: 'Mixed',
  L: 'Low',
  VL: 'Very Low,',
};

const biasScale = {
  L: 'Left Bias',
  LC: 'Left-Center Bias',
  C: 'Least Biased (Center)',
  RC: 'Right-Center Bias',
  R: 'Right Bias',
  PS: 'Pro-Science',
  CP: 'Conspiracy-Pseudoscience',
  S: 'Satire',
  FN: 'Questionable Sources',
};

const createEmbed = (entry) => ({
  embed: {
    color: '#ff0000',
    author: {
      name: `Media Bias Fact Check`,
    },
    title: entry.n,
    url: `https://mediabiasfactcheck.com/${entry.u}`,
    fields: [
      {
        name: 'Bias',
        value: biasScale[entry.b],
      },
      {
        name: 'Factual Reporting',
        value: reportingScale[entry.r],
      },
      {
        name: 'View on MBFC',
        value: `https://mediabiasfactcheck.com/${entry.u}`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: 'Source: mediabiasfactcheck.com',
    },
  },
});

function mbfcFromURL(url) {
  // TODO: handle full URLs
  // TODO: handle titles (including .toLowercase())
  // TODO: handle aliases

  const mbfcEntry = sources[url];
  if (mbfcEntry === undefined) {
    throw 'No entry found';
  }
  return createEmbed(mbfcEntry);
}

module.exports = {
  mbfcFromURL,
};
