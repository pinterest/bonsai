/*
 * @flow
 */

import type { State } from '../../reducer';
import type { Child } from '../../stats/getEntryHeirarchy';

import { connect } from 'react-redux';
import ChunkBreadcrumb from './ChunkBreadcrumb';
import * as React from 'react';

export type StateProps = {
  parentChunks: ?Array<Child>,
  totalModules: number,
};

function ChunkBreadcrumbContainer(props: StateProps) {
  return (
    props.parentChunks
      ? <ChunkBreadcrumb
        parentChunks={props.parentChunks}
        totalModules={props.totalModules}
      />
      : null
  );
}

const mapStateToProps = (state: State): StateProps => {
  if (!state.calculatedFullModuleData) {
    return {
      parentChunks: null,
      totalModules: 0,
    };
  }

  const moduleData = state.calculatedFullModuleData.moduleData;
  return {
    parentChunks: state.selectedChunkId
      ? state.calculatedFullModuleData.parentChunks
      : null,
    totalModules: moduleData
      ? moduleData.included.length + moduleData.removed.length
      : 0,
  };
};

export default connect(
  mapStateToProps,
)(ChunkBreadcrumbContainer);
