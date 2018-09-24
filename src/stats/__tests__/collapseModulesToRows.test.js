/**
 * @flow
 */

import {defaultModule, defaultExtendedModule} from '../../__test_helpers__/defaults';
import collapseModulesToRows from '../collapseModulesToRows';

describe('collapseModulesToRows', () => {
  it('should take some modules and reformat them', () => {
    const m1 = defaultExtendedModule({id: 1});
    const m2 = defaultExtendedModule({id: 2});
    const modules = [m1, m2];

    expect(collapseModulesToRows(modules)).toEqual([
      {
        collapsedSizeBytes: 0,
        displayModule: m1,
        records: [m1],
      },
      {
        collapsedSizeBytes: 0,
        displayModule: m2,
        records: [m2],
      },
    ]);
  });

  it('should collapse a single dependency', () => {
    const m1 = defaultExtendedModule({
      id: 1,
      requirements: [defaultModule({id: 2})],
      requirementsCount: 1,
    });
    const m2 = defaultExtendedModule({
      id: 2,
      requiredBy: [defaultModule({id: 1})],
      requiredByCount: 1,
    });
    const modules = [m1, m2];

    expect(collapseModulesToRows(modules)).toEqual([
      {
        collapsedSizeBytes: 0,
        displayModule: m1,
        records: [m1, m2],
      },
    ]);
  });

  it('should collapse a recursive dependency tree', () => {
    const m1 = defaultExtendedModule({
      id: 1,
      requirements: [defaultModule({id: 2})],
      requirementsCount: 1,
    });
    const m2 = defaultExtendedModule({
      id: 2,
      requiredBy: [defaultModule({id: 1})],
      requiredByCount: 1,
      requirements: [defaultModule({id: 3})],
      requirementsCount: 1,
    });
    const m3 = defaultExtendedModule({
      id: 3,
      requiredBy: [defaultModule({id: 2})],
      requiredByCount: 1,
    });
    const modules = [m1, m2, m3];

    expect(collapseModulesToRows(modules)).toEqual([
      {
        collapsedSizeBytes: 0,
        displayModule: m1,
        records: [m1, m2, m3],
      },
    ]);
  });
});
