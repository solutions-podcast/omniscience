// TODO: Make this into an NPM package
// TODO: Unit tests

const { aliases, biases, sources } = require('./mbfc-data.json');

const reportingScale = {
  VH: 'Very High',
  H: 'High',
  MF: 'Mostly Factual',
  M: 'Mixed',
  L: 'Low',
  VL: 'Very Low',
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

const biasInfo = {
  L: biases['left'],
  LC: biases['left-center'],
  C: biases['center'],
  RC: biases['right-center'],
  R: biases['right'],
  PS: biases['pro-science'],
  CP: biases['conspiracy'],
  S: biases['satire'],
  FN: biases['fake-news'],
}

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
        name: 'Factual Reporting',
        value: reportingScale[entry.r],
      },
      {
        name: 'Bias',
        value: `${biasScale[entry.b]}: ${biasInfo[entry.b].description}`,
      },
      {
        name: 'MBFC Detailed Analysis',
        value: `https://mediabiasfactcheck.com/${entry.u}`,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: 'Source: mediabiasfactcheck.com',
    },
  },
});

function getMbfcEntry(input) {
  // TODO: handle aliases

  if(!input) {
    throw 'No input given';
  }

  input = input.toLowerCase().trim();

  for(let [alias, entryUrl] of Object.entries(aliases)) {
    if(input.indexOf(alias) !== -1) {
      input = entryUrl;
    }
  }

  const mbfcEntry = Object.values(sources).find(entry => {
    return entry.d === input ||
         input.startsWith(`https://${entry.d}`)
      || input.startsWith(`https://www.${entry.d}`)
      || input.startsWith(`http://${entry.d}`)
      || input.startsWith(`http://www.${entry.d}`)
      || input.startsWith(entry.d)
      || entry.f === input
      || String(entry.n).toLowerCase() === input
      || `the ${String(entry.n).toLowerCase()}` === input
      || entry.u === input
      || String(entry.u).replace('-', '') === input
      || String(entry.u).replace('-', ' ') === input;
  });
  if (mbfcEntry !== undefined) {
    return createEmbed(mbfcEntry);
  }
  throw 'No MBFC result found';
}

module.exports = {
  getMbfcEntry
};
