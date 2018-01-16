/**
 * @flow
 */

import type {RawStats} from '../types/Stats';

import fs from 'fs';
import getRawStats from '../types/getRawStats';

export function openRawStatsFile(statsFilePath: string): Array<RawStats> {
  const data = JSON.parse(
    fs.readFileSync(statsFilePath, {encoding: 'utf8'})
  );

  return getRawStats(data);
}
