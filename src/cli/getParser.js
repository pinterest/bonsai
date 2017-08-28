/**
 * @flow
 */

import packageJSON from '../../package.json';
import { ArgumentParser } from 'argparse';

function addChunkSizesArgs(parser: ArgumentParser) {
  parser.addArgument(
    ['stats-file'],
    {
      action: 'store',
      help: `The stats file to read and calculate chunk-sizes for.`,
    },
  );
}

function addChunkSizesDiffArgs(parser: ArgumentParser) {
  parser.addArgument(
    ['file-a'],
    {
      action: 'store',
      help: `The first stats file to read and calculate chunk-sizes for.`,
    },
  );

  parser.addArgument(
    ['file-b'],
    {
      action: 'store',
      help: `The second stats file to read and calculate chunk-sizes for.`,
    },
  );
}

export default function getParser(): ArgumentParser {
  const parser = new ArgumentParser({
    addHelp: true,
    version: packageJSON.version,
  });

  const subparsers = parser.addSubparsers({
    title: 'Commands',
    dest: 'command',
  });

  addChunkSizesArgs(subparsers.addParser('chunk-sizes', {
    help: 'Calculate the total size for each chunk',
    addHelp: true,
  }));

  addChunkSizesDiffArgs(subparsers.addParser('chunk-sizes-diff', {
    help: 'Diff the chunk sizes between two stats files',
    addHelp: true,
  }));

  return parser;
}
