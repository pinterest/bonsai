/**
 * @flow
 */

import type { Flags } from './resolveArgs';

import getParser from './getParser';
import resolveArgs from './resolveArgs';

import chunkSizes from '../stats/chunkSizes';
import chunkSizesDiff from '../stats/chunkSizesDiff';
import { openRawStatsFile } from './fileSystemHelper';

const parser = getParser();

export default function main(): void {
  run(resolveArgs(parser.parseArgs()));
}

function run(flags: Flags): void {
  if (process.env.VERBOSE) {
    console.log('Invoking', flags); // eslint-disable-line no-console
  }

  switch(flags.command) {
    case 'chunk-sizes':
      console.log( // eslint-disable-line no-console
        chunkSizes(openRawStatsFile(flags.statsFile))
      );
      break;

    case 'chunk-sizes-diff':
      console.log( // eslint-disable-line no-console
        chunkSizesDiff(
          chunkSizes(openRawStatsFile(flags.fileA)),
          chunkSizes(openRawStatsFile(flags.fileB)),
        )
      );
      break;
  }
}
