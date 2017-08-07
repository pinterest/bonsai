/**
 * @flow
 */

import type {
  ExtendedModule,
  RowRepresentation,
} from '../types/Stats';
import type { ExtendedModulesById } from './getModulesById';

export default function(
  modules: Array<ExtendedModule>,
): Array<RowRepresentation> {
  return modules.map((eModule) => ({
    displayModule: eModule,
    records: [eModule],
  }));
}
