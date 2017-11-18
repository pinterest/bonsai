/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ToggleExpandModeButton } from '../ToggleExpandModeButton';

const stories = storiesOf('ToggleExpandModeButton', module);

stories
  .add('Manual mode picked', () => (
    <ToggleExpandModeButton
      expandMode="manual"
      onChangedExpandMode={action('changed')}
    />
  ))
  .add('Collapse-all mode picked', () => (
    <ToggleExpandModeButton
      expandMode="collapse-all"
      onChangedExpandMode={action('changed')}
    />
  ))
  .add('Expand-all mode picked', () => (
    <ToggleExpandModeButton
      expandMode="expand-all"
      onChangedExpandMode={action('changed')}
    />
  ));
