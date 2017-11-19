/*
 * @flow
 */

import type { ModeType } from '../../reducer';

import BlacklistTableContainer from './BlacklistTableContainer';
import ChunkBreadcrumbContainer from './ChunkBreadcrumbContainer';
import LoopTableContainer from './LoopTableContainer';
import ModuleDataContainer from './ModuleDataContainer';
import * as React from 'react';

export type Props = {
  appMode: ModeType,
};

export default function SelectedChunk(props: Props) {
  switch(props.appMode) {
    case 'single':
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

    case 'diff':
      return (
        <main className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <ModuleDataContainer />
            </div>
          </div>
        </main>
      );
    default:
      throw new Error(`Invalid appMode: ${JSON.stringify(props.appMode)}`);
  }
}
