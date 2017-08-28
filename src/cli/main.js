/**
 * @flow
 */

import type { Flags } from './resolveArgs';

import chunkSizes from './chunkSizes';
import chunkSizesDiff from './chunkSizesDiff';

export default function main(flags: Flags): void {
  if (process.env.VERBOSE) {
    console.log('Invoking', flags); // eslint-disable-line no-console
  }

  switch(flags.command) {
    case 'chunk-sizes':
      console.log( // eslint-disable-line no-console
        chunkSizes(flags.statsFile)
      );
      break;

    case 'chunk-sizes-diff':
      console.log( // eslint-disable-line no-console
        chunkSizesDiff(
          chunkSizes(flags.fileA),
          chunkSizes(flags.fileB),
        )
      );
      break;
  }
}
