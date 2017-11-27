/**
 * @flow
 */

import reducer, { INITIAL_STATE } from '../reducer';

import {
  DiscoveredDataPaths,
  PickDataPath,
  RequestedDataAtPath,
  LoadedStatsAtPath,
  ErroredAtPath,
} from '../actions';

expect.extend({
  toCloneState(action) {
    const state = {...INITIAL_STATE};
    const newState = reducer(state, action);
    const pass = !Object.is(state, newState);

    if (pass) {
      return {
        message: () => `expected ${action} not to reduce into a new state object`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${action} to reduce into a new state object`,
        pass: false,
      };
    }
  },
});

const mockDispatch = (action) => action;

describe('reducer', () => {
  describe('DiscoveredDataPaths action', () => {
    it('should clone the state when reduced', () => {
      expect(DiscoveredDataPaths(mockDispatch)([])).toCloneState();
    });

    it('should append to the list of found dataPaths', () => {
      const state = {...INITIAL_STATE};
      const action = DiscoveredDataPaths(mockDispatch)(
        ['test-file.json', 'another-file.json'],
      );

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'unknown',
          'another-file.json': 'unknown',
        },
      }));
    });

    it('should not override status for previously known files', () => {
      const state = {
        ...INITIAL_STATE,
        dataPaths: {
          'test-file.json': 'ready',
        },
      };
      const action = DiscoveredDataPaths(mockDispatch)(
        ['test-file.json', 'another-file.json'],
      );

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'ready',
          'another-file.json': 'unknown',
        },
      }));
    });
  });

  describe('PickDataPath action', () => {
    it('should clone the state when reduced', () => {
      expect(PickDataPath(mockDispatch)('test-file.json')).toCloneState();
    });

    it('should ensure the filename is in dataPaths', () => {
      const state = {...INITIAL_STATE};
      const action = PickDataPath(mockDispatch)('test-file.json');

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'unknown',
        },
        selectedFilename: 'test-file.json',
      }));
    });

    it('should not munge dataPaths when the path exists', () => {
      const state = {
        ...INITIAL_STATE,
        dataPaths: {
          'test-file.json': 'ready',
        },
      };
      const action = PickDataPath(mockDispatch)('test-file.json');

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'ready',
        },
        selectedFilename: 'test-file.json',
      }));
    });
  });

  describe('RequestedDataAtPath action', () => {
    it('should clone the state when reduced', () => {
      expect(RequestedDataAtPath(mockDispatch)('test-file.json')).toCloneState();
    });

    it('should ensure the filename is loading in dataPaths', () => {
      const state = {...INITIAL_STATE};
      const action = RequestedDataAtPath(mockDispatch)('test-file.json');

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'loading',
        },
      }));
    });

    it('should not munge dataPaths when the path is ready', () => {
      const state = {
        ...INITIAL_STATE,
        dataPaths: {
          'test-file.json': 'ready',
        },
      };
      const action = RequestedDataAtPath(mockDispatch)('test-file.json');

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'ready',
        },
      }));
    });
  });

  describe('LoadedStatsAtPath action', () => {
    it('should clone the state when reduced', () => {
      expect(LoadedStatsAtPath(mockDispatch)('test-file.json', {})).toCloneState();
    });

    it('should ensure the filename is ready in dataPaths', () => {
      const state = {...INITIAL_STATE};
      const action = LoadedStatsAtPath(mockDispatch)('test-file.json', {});

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'ready',
        },
        json: {
          'test-file.json': expect.objectContaining({}),
        },
      }));
    });
  });

  describe('ErroredAtPath action', () => {
    it('should clone the state when reduced', () => {
      expect(ErroredAtPath(mockDispatch)('test-file.json')).toCloneState();
    });

    it('should ensure the filename is errored in dataPaths', () => {
      const state = {...INITIAL_STATE};
      const action = ErroredAtPath(mockDispatch)('test-file.json', 'Bad things');

      const newState = reducer(state, action);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: {
          'test-file.json': 'error',
        },
      }));
    });
  });

});
