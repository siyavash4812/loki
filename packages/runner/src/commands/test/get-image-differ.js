const { createGraphicsMagickDiffer } = require('@loki/diff-graphics-magick');
const { createLooksSameDiffer } = require('@loki/diff-looks-same');
const { createPixelmatchDiffer } = require('@loki/diff-pixelmatch');
const { createOdiffDiffer } = require('@loki/diff-odiff');

function getImageDiffer(engine, config) {
  switch (engine) {
    case undefined:
    case 'pixelmatch': {
      return createPixelmatchDiffer(config);
    }
    case 'looks-same': {
      return createLooksSameDiffer(config);
    }
    case 'gm': {
      return createGraphicsMagickDiffer(config);
    }
    case 'odiff': {
      return createOdiffDiffer(config);
    }
    default: {
      throw new Error(`Unsupported engine "${engine}"`);
    }
  }
}

module.exports = { getImageDiffer };
