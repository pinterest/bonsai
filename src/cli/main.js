/**
 * @flow
 */

import type { Flags } from './resolveArgs';

import chunkSize from './chunkSize';

export default function main(flags: Flags): void {
  if (process.env.VERBOSE) {
    console.log('Invoking', flags); // eslint-disable-line no-console
  }

  switch(flags.command) {
    case 'chunk-size':
      chunkSize(flags.statsFile);
  }
}
