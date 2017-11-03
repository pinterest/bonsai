/**
 * @flow
 */

import type { Flags } from './resolveArgs';

import chunkSizes from '../stats/chunkSizes';
import chunkSizesDiff from '../stats/chunkSizesDiff';
import { openRawStatsFile } from './fileSystemHelper';

export default function main(flags: Flags): void {
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
