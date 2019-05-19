/**
 * @flow
 */

import type { Flags } from './resolveArgs';

import getParser from './getParser';
import resolveArgs from './resolveArgs';

import assetBasics from '../stats/assetBasics';
import getEntryHierarchy from '../stats/getEntryHierarchy';
import chunkSizes from '../stats/chunkSizes';
import chunkSizesDiff from '../stats/chunkSizesDiff';
import { openRawStatsFile } from './fileSystemHelper';

export default function main(): void {
  run(resolveArgs(getParser().parseArgs()));
}

function run(flags: Flags): void {
  if (process.env.VERBOSE) {
    console.log('Invoking', flags); // eslint-disable-line no-console
  }

  switch(flags.command) {
    case 'assets': {
      const stats = openRawStatsFile(flags.statsFile);
      const assetInfo = stats.map((stat) => {
        return assetBasics(flags.statsFile, stat);
      });

      console.log(JSON.stringify(assetInfo, null, '\t'));
      break;
    }
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
