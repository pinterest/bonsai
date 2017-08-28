/**
 * @flow
 */

import { defaultExtendedModule } from '../../__test_helpers__/defaults';
import filterModules from '../filterModules';

const emptyFilters = {
  moduleName: '',
  cumulativeSizeMin: '',
  cumulativeSizeMax: '',
  requiredByCountMin: '',
  requiredByCountMax: '',
  requirementsCountMin: '',
  requirementsCountMax: '',
};

describe('filterModules', () => {
  it('should return everything when there are no filters', () => {
    const modules = [
      defaultExtendedModule({id: 1}),
      defaultExtendedModule({id: 2}),
      defaultExtendedModule({id: 3}),
    ];

    expect(filterModules(modules, emptyFilters)).toEqual(modules);
  });

  describe('name filter', () => {
    it('keep modules when the name matches an alpha/num string', () => {
      const indexJS = defaultExtendedModule({id: 1, name: 'index'});
      const buttonJS = defaultExtendedModule({id: 1, name: 'button'});

      const filters = {
        ...emptyFilters,
        moduleName: 'index',
      };

      expect(filterModules([indexJS, buttonJS], filters)).toEqual([indexJS]);
    });

    it('keep modules when the name matches a string fragment', () => {
      const indexJS = defaultExtendedModule({
        id: 1,
        name: 'src/app/index',
      });
      const buttonJS = defaultExtendedModule({
        id: 1,
        name: 'src/node_modules/button/index',
      });

      const filters = {
        ...emptyFilters,
        moduleName: 'app',
      };

      expect(filterModules([indexJS, buttonJS], filters)).toEqual([indexJS]);
    });

    it('keep modules when the name matches a string with special chars', () => {
      const indexJS = defaultExtendedModule({
        id: 1,
        name: 'src/app/index',
      });
      const buttonJS = defaultExtendedModule({
        id: 1,
        name: 'src/node_modules/button/index',
      });

      const filters = {
        ...emptyFilters,
        moduleName: 'src/(?!node_modules)',
      };

      expect(filterModules([indexJS, buttonJS], filters)).toEqual([indexJS]);
    });
  });

  describe('number range filters', () => {
    const smallModule = defaultExtendedModule({
      id: 'small',
      cumulativeSize: 10,
      requiredByCount: 3,
      requirementsCount: 5,
    });
    const mediumModule = defaultExtendedModule({
      id: 'medium',
      cumulativeSize: 200,
      requiredByCount: 17,
      requirementsCount: 19,
    });
    const largeModule = defaultExtendedModule({
      id: 'large',
      cumulativeSize: 3000,
      requiredByCount: 23,
      requirementsCount: 29,
    });

    const allModuleSizes = [smallModule, mediumModule, largeModule];

    it('should remove nothing when cumulativeSizeMin & cumulativeSizeMax are empty', () => {
      const filters = {
        ...emptyFilters,
        cumulativeSizeMin: '',
        cumulativeSizeMax: '',
      };

      expect(filterModules(allModuleSizes, filters)).toEqual([
        smallModule,
        mediumModule,
        largeModule,
      ]);
    });

    it('should remove small & large when cumulativeSizeMin & cumulativeSizeMax is non-empty', () => {
      const filters = {
        ...emptyFilters,
        cumulativeSizeMin: '100',
        cumulativeSizeMax: '1000',
      };

      expect(filterModules(allModuleSizes, filters)).toEqual([
        mediumModule,
      ]);
    });

    it('should remove just the small when cumulativeSizeMin is non-empty', () => {
      const filters = {
        ...emptyFilters,
        cumulativeSizeMin: '100',
        cumulativeSizeMax: '',
      };

      expect(filterModules(allModuleSizes, filters)).toEqual([
        mediumModule,
        largeModule,
      ]);
    });

    it('should remove just the large when cumulativeSizeMax is non-empty', () => {
      const filters = {
        ...emptyFilters,
        cumulativeSizeMin: '',
        cumulativeSizeMax: '1000',
      };

      expect(filterModules(allModuleSizes, filters)).toEqual([
        smallModule,
        mediumModule,
      ]);
    });

    it('should remove small & large when requiredByCountMin & requiredByCountMax is non-empty', () => {
      const filters = {
        ...emptyFilters,
        requiredByCountMin: '12',
        requiredByCountMax: '20',
      };

      expect(filterModules(allModuleSizes, filters)).toEqual([
        mediumModule,
      ]);
    });

    it('should remove small & large when requirementsCountMin & requirementsCountMax is non-empty', () => {
      const filters = {
        ...emptyFilters,
        requirementsCountMin: '12',
        requirementsCountMax: '20',
      };

      expect(filterModules(allModuleSizes, filters)).toEqual([
        mediumModule,
      ]);
    });
  });

});
