/*
 * @flow
 */

import type { Dispatch } from '../../reducer';
import type { DispatchProps } from './ModulePanels';
import type {ExtendedModule} from '../../types/Stats';

import {connect} from 'react-redux'
import {
  FocusElement,
} from '../../actions';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

export type OwnProps = {
  extendedModules: ExtendedModule,
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onFocusChanged: FocusElement(dispatch),
  };
};

export const RequiredByPanelContainer = connect(
  null,
  mapDispatchToProps,
)(RequiredByPanel);

export const RequirementsPanelContainer = connect(
  null,
  mapDispatchToProps,
)(RequirementsPanel);


