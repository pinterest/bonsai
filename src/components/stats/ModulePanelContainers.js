/*
 * @flow
 */

import type { Dispatch } from '../../utils/reducer';
import type { Props, OwnProps, DispatchProps } from './ModulePanels';

import {connect} from 'react-redux';
import {
  FocusElement,
} from '../../utils/actions';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onFocusChanged: FocusElement(dispatch),
  };
};

export const RequiredByPanelContainer = connect<Props, OwnProps, _, _, _, _>(
  null,
  mapDispatchToProps,
)(RequiredByPanel);

export const RequirementsPanelContainer = connect<Props, OwnProps, _, _, _, _>(
  null,
  mapDispatchToProps,
)(RequirementsPanel);
