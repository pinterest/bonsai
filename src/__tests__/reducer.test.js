/**
 * @flow
 */

import reducer, { INITIAL_STATE } from '../reducer';
import {
  ChangedMode,
  InitDataPaths,
  PickedFile,
  LoadingFailed,
  LoadingFinished,
} from '../actions';

const mockDispatch = (action) => action;

describe('reducer', () => {
  describe('onChangedMode action', () => {
    it('should toggle the appMode', () => {
      const state = {...INITIAL_STATE};

      const singleAction = ChangedMode(mockDispatch)('single');
      const newState = reducer(state, singleAction);
      expect(newState).toEqual(expect.objectContaining({
        appMode: 'single',
      }));

      const diffAction = ChangedMode(mockDispatch)('diff');
      const finalState = reducer(newState, diffAction);
      expect(finalState).toEqual(expect.objectContaining({
        appMode: 'diff',
      }));
    });
  });

  describe('InitDataPaths action', () => {
    it('should setup dataPaths', () => {
      const state = {...INITIAL_STATE};
      const action = InitDataPaths(mockDispatch)(
        ['test-file.json', 'another-file.json'],
      );

      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: ['test-file.json', 'another-file.json'],
      }));
    });

    it('should de-dupe dataPaths', () => {
      const state = {
        ...INITIAL_STATE,
        dataPaths: ['test-file.json'],
      };
      const action = InitDataPaths(mockDispatch)(
        ['test-file.json', 'another-file.json'],
      );

      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
      expect(newState).toEqual(expect.objectContaining({
        dataPaths: ['test-file.json', 'another-file.json'],
      }));
    });
  });

  describe('PickedFile action', () => {
    it('should change the selectedFilename after a pickedFile action', () => {
      const state = {...INITIAL_STATE};
      const action = PickedFile(mockDispatch)(
        'A',
        'test-file.json',
      );

      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
      expect(newState).toEqual(expect.objectContaining({
        selectedFilenameA: 'test-file.json',
      }));
    });
  });

  describe('LoadingFailed action', () => {
    it('should clear selectedFilename after a loadingFailed action', () => {
      const state = {
        ...INITIAL_STATE,
        selectedFilenameA: 'test-file.json',
      };
      const action = LoadingFailed(mockDispatch)();

      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
      expect(newState).toEqual(expect.objectContaining({
        selectedFilename: null,
      }));
    });
  });

  describe('LoadingFinished action', () => {
    it('should change selectedFilename and cache the data on loadingFinished', () => {
      const state = {...INITIAL_STATE};
      const mockStats = {chunks: [], modules: []};
      const action = LoadingFinished(mockDispatch)(
        'test-file.json',
        mockStats,
      );

      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
      expect(newState).toEqual(expect.objectContaining({
        selectedFilename: 'test-file.json',
        dataPaths: ['test-file.json'],
        json: {
          'test-file.json': mockStats,
        },
      }));
    });

    it('should de-dupe dataPaths on loadingFinished', () => {
      const state = {
        ...INITIAL_STATE,
        dataPaths: ['test-file.json'],
      };
      const mockStats = {chunks: [], modules: []};
      const action = LoadingFinished(mockDispatch)(
        'test-file.json',
        mockStats,
      );

      const newState = reducer(state, action);
      expect(newState).not.toBe(state);
      expect(newState).toEqual(expect.objectContaining({
        selectedFilename: 'test-file.json',
        dataPaths: ['test-file.json'],
        json: {
          'test-file.json': mockStats,
        },
      }));
    });
  });
});
