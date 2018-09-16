/*
 * @flow
 */

import BlacklistTableContainer from './BlacklistTableContainer';
import ChunkBreadcrumbContainer from './ChunkBreadcrumbContainer';
import LoopTableContainer from './LoopTableContainer';
import ModuleTableContainer from './ModuleTableContainer';
import * as React from 'react';

export default function SelectedChunk() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-11 ml-auto">
          <ChunkBreadcrumbContainer />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <BlacklistTableContainer />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LoopTableContainer />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <ModuleTableContainer />
        </div>
      </div>
    </React.Fragment>
  );
}
