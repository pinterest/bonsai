/**
 * @flow
 */

import packageJSON from '../../package.json';
import { ArgumentParser } from 'argparse';

function addChunkSizeArgs(parser: ArgumentParser) {
  parser.addArgument(
    ['stats-file'],
    {
      action: 'store',
      help: `The stats file to read and calculate chunk-sizes for.`,
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

  addChunkSizeArgs(subparsers.addParser('chunk-size', {
    help: 'Calculate the total size for each chunk',
    addHelp: true,
  }));

  return parser;
}
