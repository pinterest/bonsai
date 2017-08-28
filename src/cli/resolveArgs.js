/**
 * @flow
 */

import path from 'path';
import loadPkg from 'load-pkg';

export type Args = {
  command?: string,
  root?: string,
  'stats-file'?: string,
  'file-a'?: string,
  'file-b'?: string,
};

export type Flags = {
  command: string,
  root: string,
  statsFile: string,
  fileA: string,
  fileB: string,
};

export const DEFAULT_FLAGS: Flags = {
  command: 'chunk-size',
  root: '.',
  statsFile: './stats.json',
  fileA: './stats.json',
  fileB: './stats.json',
};

function resolveDefaultArgs(args: Args, defaults: Flags): Flags {
  return {
    command: args.command || defaults.command,
    root: args.root || defaults.root,
    statsFile: args['stats-file'] || defaults.statsFile,
    fileA: args['file-a'] || defaults.fileA,
    fileB: args['file-b'] || defaults.fileB,
  };
}

export default function resolveArgs(args: Args): Flags {
  if (process.env.VERBOSE) {
    console.log('Parsing Args', args); // eslint-disable-line no-console
  }

  const pkg = loadPkg.sync(
    path.resolve(args.root || DEFAULT_FLAGS.root)
  );

  const defaults = (pkg && pkg['bonsai'])
    ? resolveDefaultArgs(
      {...pkg['bonsai'], command: null},
      DEFAULT_FLAGS,
    )
    : DEFAULT_FLAGS;

  return resolveDefaultArgs(args, defaults);
}
