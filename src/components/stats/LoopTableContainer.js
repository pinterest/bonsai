/*
 * @flow
 */

import type { ExtendedModule } from '../../types/Stats';
import type { State } from '../../reducer';

import { connect } from 'react-redux';
import LoopTable from './LoopTable';
import * as React from 'react';

type Props = {
  extendedModules: ?Array<ExtendedModule>,
};

function LoopTableContainer(props: Props) {
  return (
    props.extendedModules
      ? <div className="row">
        <div className="col-sm-12">
          <LoopTable extendedModules={props.extendedModules} />
        </div>
      </div>
      : null
  );
}

const mapStateToProps = (state: State): Props => {
  return {
    extendedModules: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.extendedModules
      : [],
  };
};

export default connect(
  mapStateToProps,
)(LoopTableContainer);
