/*
 * @flow
 */

import type { State } from '../../utils/reducer';
import type { Props } from './ChunkBreadcrumb';

import { connect } from 'react-redux';
import ChunkBreadcrumb from './ChunkBreadcrumb';

const mapStateToProps = (state: State): Props => {
  if (!state.calculatedFullModuleData) {
    return {
      parentChunks: [],
      totalModules: 0,
    };
  }

  const {
    parentChunks,
    moduleData,
  }  = state.calculatedFullModuleData;
  return {
    parentChunks: (state.selectedChunkId !== null && parentChunks)
      ? parentChunks
      : [],
    totalModules: moduleData
      ? moduleData.included.length + moduleData.removed.length
      : 0,
  };
};

export default connect(
  mapStateToProps,
)(ChunkBreadcrumb);
