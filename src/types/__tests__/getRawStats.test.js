/**
 * @flow
 */

import type { RawStats } from '../../types/Stats';

import getRawStats, {
  getStatsJson,
  getMultiStatsJson,
} from '../getRawStats';

// eslint-disable-next-line no-unused-vars
function isRawStats(stats: RawStats) {
  // Mock function to validate flowtype
}

function expectSingleConfigToFallThroughToMulti() {
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalledTimes(1);
  // eslint-disable-next-line no-console
  expect(console.error).toHaveBeenCalledWith(`Could not find 'chunks' field.`);
}

describe('getRawStats', () => {
  beforeEach(() => {
    (console: any).error = jest.fn();
  });

  describe('getStatsJson', () => {
    it('should return a typed object when a single json stats is passed', () => {
      const json = {
        chunks: [],
        modules: [],
      };

      const stats = getStatsJson(json);

      isRawStats(stats);
      expect(stats).toEqual(json);
      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
    });

    const failureModes = [
      {
        message: 'should throw when chunks is missing',
        json: {modules: []},
      },
      {
        message: 'should throw when modules is missing',
        json: {chunks: []},
      },
      {
        message: 'should throw when chunks is not an array',
        json: {chunks: true, modules: []},
      },
      {
        message: 'should throw when modules is not an array',
        json: {chunks: [], modules: true},
      },
    ];

    failureModes.forEach((fixture) => {
      it(fixture.message, () => {
        expect(() => getStatsJson(fixture.json)).toThrow();
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getMultiStatsJson', () => {
    it('should return a typed object when multi-config json stats is passed', () => {
      const json = {
        children: [{
          chunks: [],
          modules: [],
        }],
      };

      const stats = getMultiStatsJson(json);

      isRawStats(stats.children[0]);
      expect(stats).toEqual(json);
      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
    });

    const failureModes = [
      {
        message: 'should throw when children field is missing',
        json: {},
      },
      {
        message: 'should throw when children field is not an array',
        json: {children: true},
      },
      {
        message: 'should throw when children[0].chunks is missing',
        json: {
          children: [{
            // chunks: [],
            modules: [],
          }],
        },
      },
      {
        message: 'should throw when children[0].modules is missing',
        json: {
          children: [{
            chunks: [],
            // modules: [],
          }],
        },
      },
      {
        message: 'should throw when children[0].chunks is not an array',
        json: {
          children: [{
            chunks: true,
            modules: [],
          }],
        },
      },
      {
        message: 'should throw when children[0].modules is not an array',
        json: {
          children: [{
            chunks: [],
            modules: true,
          }],
        },
      },
    ];

    failureModes.forEach((fixture) => {
      it(fixture.message, () => {
        expect(() => getMultiStatsJson(fixture.json)).toThrow();
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getRawStats', () => {
    it('should detect and accept single configs', () => {
      const json = {
        chunks: [],
        modules: [],
      };

      const stats = getRawStats('test-stats.json', json);

      isRawStats(stats['test-stats.json']);
      expect(stats).toEqual([
        json
      ]);
      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should detect and accept multi configs', () => {
      const json = {
        children: [{
          chunks: [],
          modules: [],
        }],
      };

      const stats = getRawStats('test-stats.json', json);

      isRawStats(stats['test-stats.json']);
      expect(stats).toEqual([
        json.children[0],
      ]);
      expectSingleConfigToFallThroughToMulti();
    });

    it('should disambiguate filenames for multi-config stats', () => {
      const json = {
        children: [{
          chunks: [],
          modules: [],
        }, {
          chunks: [],
          modules: [],
        }],
      };

      const stats = getRawStats('test-stats.json', json);

      isRawStats(stats['test-stats.json']);
      expect(stats).toEqual([
        json.children[0],
        json.children[1],
      ]);
      expectSingleConfigToFallThroughToMulti();
    });
  });
});
