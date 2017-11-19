/*
 * @flow
 */

import BlacklistTableContainer from './BlacklistTableContainer';
import ChunkBreadcrumbContainer from './ChunkBreadcrumbContainer';
import LoopTableContainer from './LoopTableContainer';
import ModuleDataContainer from './ModuleDataContainer';
import * as React from 'react';

export default function SelectedChunk() {
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-sm-11 col-sm-push-1">
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
          <ModuleDataContainer />
        </div>
      </div>
    </main>
  );
}
