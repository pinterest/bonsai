/**
 * @flow
 */

import packageJSON from '../../package.json';
import { ArgumentParser } from 'argparse';

function addStatsFileArg(parser: ArgumentParser) {
  parser.addArgument(
    ['stats-file'],
    {
      action: 'store',
      help: `The stats file to read from.`,
    },
  );
}

function addMultiStatsFileArgs(parser: ArgumentParser) {
  parser.addArgument(
    ['file-a'],
    {
      action: 'store',
      help: `The first stats file to read from.`,
    },
  );

  parser.addArgument(
    ['file-b'],
    {
      action: 'store',
      help: `The second stats file to read from.`,
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

  addStatsFileArg(subparsers.addParser('assets', {
    help: 'Foreach asset: list some basic/summary data.',
    addHelp: true,
  }));

  addStatsFileArg(subparsers.addParser('chunks', {
    help: 'Foreach chunk list some basic/summary data.',
    addHelp: true,
  }));

  addStatsFileArg(subparsers.addParser('chunk-sizes', {
    help: 'Calculate the total size for each chunk',
    addHelp: true,
  }));

  addMultiStatsFileArgs(subparsers.addParser('chunk-sizes-diff', {
    help: 'Diff the chunk sizes between two stats files',
    addHelp: true,
  }));

  return parser;
}
