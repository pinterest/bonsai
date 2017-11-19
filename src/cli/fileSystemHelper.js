/**
 * @flow
 */

import fs from 'fs';
import getRawStats from '../types/getRawStats';

export function openRawStatsFile(statsFilePath: string): * {
  const data = JSON.parse(
    fs.readFileSync(statsFilePath, {encoding: 'utf8'})
  );

  return getRawStats(statsFilePath, data);
}
