/*
 * @flow
 */

import fullModuleData from '../stats/fullModuleData';

try {
  describe('Integration tests', () => {
    describe('Single Entry Suite', () => {
      const config = require('./tmp/prod-config.json');
      it('should match fullModuleData', () => {
        expect(fullModuleData(config, null, [])).toMatchSnapshot();
      });
    });

    describe('Multi Entry Suite', () => {
      const config = require('./tmp/multi-config.json');
      it('should match fullModuleData', () => {
        expect(fullModuleData(config.children[0], null, [])).toMatchSnapshot();
        expect(fullModuleData(config.children[1], null, [])).toMatchSnapshot();
      });
    });
  });
} catch (error) {
  // eslint-disable-next-line jest/no-identical-title, jest/no-disabled-tests
  describe.skip('Integration tests', () => {
    // empty
  });
}
