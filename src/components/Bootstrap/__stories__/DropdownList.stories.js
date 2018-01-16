/**
 * @flow
 */

import type {Item} from '../DropdownList';

import Button from '../Button';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';

import DropdownList from '../DropdownList';

const items: Array<Item> = [
  { label: 'Adele', value: 1 },
  { label: 'Agnes', value: 2 },
  { label: 'Billy', value: 3 },
  { label: 'Bob', value: 4 },
  { label: 'Calvin', value: 5 },
  { label: 'Christina', value: 6 },
  { label: 'Cindy', value: 7 },
];

const firstArgAction = decorateAction([
  args => args.slice(0, 1)
]);

storiesOf('Bootstrap/DropdownList', module)
  .add('Basic', () => (
    <DropdownList
      items={items}
      onItemPicked={firstArgAction('Picked item')}
    >
      Pick a name
    </DropdownList>
  ))
  .add('Open is default', () => (
    <DropdownList
      defaultIsOpen={true}
      items={items}
      onItemPicked={firstArgAction('Picked item')}
    >
      Pick a name
    </DropdownList>
  ))
  .add('Custom items', () => (
    <DropdownList
      defaultIsOpen={true}
      onItemPicked={firstArgAction('Picked item')}
      items={items.map((item) => ({
        node(hideContent) {
          return (
            <Button
              display="block"
              onClick={() => {
                hideContent();
                action('Picked item')(item.value);
              }}>
              {String(item.label || item.value)}
            </Button>
          );
        },
        value: item.value,
      }))}>
      Pick a name
    </DropdownList>
  ))
  .add('Default filter', () => (
    <DropdownList
      defaultIsOpen={true}
      items={items}
      onItemPicked={firstArgAction('Picked item')}
      filter="default"
    >
      Pick a name
    </DropdownList>
  ))
  .add('Custom filter', () => (
    <DropdownList
      items={items}
      onItemPicked={firstArgAction('Picked item')}
      filter={(searchTerm: string, item: Item) => {
        return String(item.label || item.value).includes(searchTerm);
      }}
    >
      Pick a name
    </DropdownList>
  ));
