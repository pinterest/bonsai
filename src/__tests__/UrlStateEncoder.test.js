/**
 * @flow
 */

import UrlStateEncoder from '../UrlStateEncoder';

let MOCK_STORE;

describe('UrlStateEncoder', () => {
  beforeEach(() => {
    MOCK_STORE = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };

    UrlStateEncoder.instance = null;

    window.location.hash = '';
  });

  it('should return a cached instance from the factory', () => {
    expect(UrlStateEncoder.instance).toBeNull();

    const encoder = UrlStateEncoder.factory(MOCK_STORE);
    expect(encoder).toBe(UrlStateEncoder.instance);

    const secondEncoder = UrlStateEncoder.factory(MOCK_STORE);
    expect(encoder).toBe(secondEncoder);
  });

  it('should subscribe to store changes', () => {
    new UrlStateEncoder(MOCK_STORE);

    expect(MOCK_STORE.subscribe).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe when destroyed', () => {
    const unsub = jest.fn();
    MOCK_STORE.subscribe = jest.fn(() => unsub);

    new UrlStateEncoder(MOCK_STORE).destroy();

    expect(unsub).toHaveBeenCalledTimes(1);
  });

  describe('reading from location', () => {
    it('should not dispatch when there is nothing in the location hash', () => {
      window.location.hash = '';
      new UrlStateEncoder(MOCK_STORE);

      window.location.hash = '#';
      new UrlStateEncoder(MOCK_STORE);

      window.location.hash = '#foo=bar';
      new UrlStateEncoder(MOCK_STORE);

      expect(MOCK_STORE.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch when filename is in the location hash', () => {
      window.location.hash = '#filename=main.js';

      new UrlStateEncoder(MOCK_STORE);

      expect(MOCK_STORE.dispatch).toHaveBeenCalledTimes(1);
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'pickedFile',
        filename: 'main.js',
        position: 'A',
      });
    });

    it('should dispatch when chunk is in the location hash', () => {
      window.location.hash = '#filename=main.js&chunk=1';

      new UrlStateEncoder(MOCK_STORE);

      expect(MOCK_STORE.dispatch).toHaveBeenCalledTimes(2);
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'pickedFile',
        filename: 'main.js',
        position: 'A',
      });
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'onPickedChunk',
        chunkId: '1',
      });
    });

    it('should dispatch when an `rm` list is in the location hash', () => {
      window.location.hash = '#filename=main.js&chunk=1&rm=3,5,7';

      new UrlStateEncoder(MOCK_STORE);

      expect(MOCK_STORE.dispatch).toHaveBeenCalledTimes(5);
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'pickedFile',
        filename: 'main.js',
        position: 'A',
      });
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'onPickedChunk',
        chunkId: '1',
      });
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'onRemoveModule',
        moduleID: '3',
      });
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'onRemoveModule',
        moduleID: '5',
      });
      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'onRemoveModule',
        moduleID: '7',
      });
    });

    it('should decode encoded uri segments', () => {
      window.location.hash = '#filename=main%20file.js';

      new UrlStateEncoder(MOCK_STORE);

      expect(MOCK_STORE.dispatch).toHaveBeenCalledWith({
        type: 'pickedFile',
        filename: 'main file.js',
        position: 'A',
      });
    });
  });

  describe('writing to location', () => {
    it('should write the selectedFilename', () => {
      const result = new UrlStateEncoder(MOCK_STORE).encodeStateForHash({
        selectedFilename: 'main file.js',
      });

      expect(result).toEqual('filename=main%20file.js');
    });

    it('should write the selectedChunkId', () => {
      const result = new UrlStateEncoder(MOCK_STORE).encodeStateForHash({
        selectedFilename: 'main file.js',
        selectedChunkId: 1,
      });

      expect(result).toEqual('filename=main%20file.js&chunk=1');
    });

    it('should write the blacklistedModuleIds', () => {
      const result = new UrlStateEncoder(MOCK_STORE).encodeStateForHash({
        selectedFilename: 'main file.js',
        selectedChunkId: 1,
        blacklistedModuleIds: [3, 5, 7],
      });

      expect(result).toEqual('filename=main%20file.js&chunk=1&rm=3%2C5%2C7');
    });

    it('should set the location when the store updates', () => {
      MOCK_STORE.getState = jest.fn(() => ({
        selectedFilename: 'main.js',
      }));

      new UrlStateEncoder(MOCK_STORE);

      const callback = MOCK_STORE.subscribe.mock.calls[0][0];
      expect(window.location.hash).toEqual('');

      callback();
      expect(window.location.hash).toEqual('#filename=main.js');
    });
  });

});
