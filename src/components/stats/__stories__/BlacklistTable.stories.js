/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';

import { defaultExtendedModule, reasonFromModule } from '../../../__test_helpers__/defaults';
import BlacklistTable from '../BlacklistTable';

const firstArgAction = decorateAction([
  args => args.slice(0, 1)
]);

const ENTRY_ZERO = defaultExtendedModule({
  id: 0,
  name: 'Entry Zero',
  size: 100,
  reasons: [],
});

const ENTRY_ONE = defaultExtendedModule({
  id: 1,
  name: 'Entry One',
  size: 100,
  reasons: [],
});

const ZERO_A = defaultExtendedModule({
  id: 2,
  name: 'Module Zero-A',
  size: 250,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
  ],
});

const COMMON = defaultExtendedModule({
  id: 3,
  name: 'Module Common',
  size: 200,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
    reasonFromModule(ENTRY_ONE),
  ],
});

const BIG_MODULE = defaultExtendedModule({
  id: 5,
  name: 'Big Module',
  size: 1000,
  reasons: [
    reasonFromModule(ZERO_A),
    reasonFromModule(COMMON),
  ],
});

const ENTRY_ONE_A = defaultExtendedModule({
  id: 600,
  name: 'Module One-A',
  size: 600,
  reasons: [
    reasonFromModule(ENTRY_ONE),
  ],
});

const ENTRY_ONE_B = defaultExtendedModule({
  id: 300,
  name: 'Module One-B',
  size: 300,
  reasons: [
    reasonFromModule(ENTRY_ONE_A),
  ],
});

storiesOf('BlacklistTable', module)
  .add('Empty data', () => (
    <BlacklistTable
      blacklistedModuleIds={[]}
      moduleData={null}
      onIncludeModule={firstArgAction('include module')}
    />
  ))
  .add('Empty list', () => (
    <BlacklistTable
      blacklistedModuleIds={[]}
      moduleData={{
        included: [
          ENTRY_ZERO,
          ENTRY_ONE,
          ZERO_A,
          COMMON,
          BIG_MODULE,
          ENTRY_ONE_A,
          ENTRY_ONE_B,
        ],
        removed: [],
      }}
      onIncludeModule={firstArgAction('include module')}
    />
  ))
  .add('Module with no children removed', () => (
    <BlacklistTable
      blacklistedModuleIds={[
        ENTRY_ONE_B.id
      ]}
      moduleData={{
        included: [
          ENTRY_ZERO,
          ENTRY_ONE,
          ZERO_A,
          COMMON,
          BIG_MODULE,
          ENTRY_ONE_A,
        ],
        removed: [
          ENTRY_ONE_B,
        ],
      }}
      onIncludeModule={firstArgAction('include module')}
    />
  ))
  .add('Module with some children removed', () => (
    <BlacklistTable
      blacklistedModuleIds={[
        ENTRY_ONE.id,
      ]}
      moduleData={{
        included: [
          ENTRY_ZERO,
          ENTRY_ONE,
          ZERO_A,
          COMMON,
          BIG_MODULE,
          ENTRY_ONE_A,
        ],
        removed: [
          ENTRY_ONE,
          ENTRY_ONE_A,
          ENTRY_ONE_B,
        ],
      }}
      onIncludeModule={firstArgAction('include module')}
    />
  ));
