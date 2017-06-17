/**
 * @flow
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import SortLabel from '../SortLabel';

storiesOf('SortLabel', module)
  .add('Something else is sorted', () => (
    <SortLabel
      field="size"
      sort={{
        field: 'name',
        direction: 'ASC',
      }}>Size</SortLabel>
  ))
  .add('This field is sorted ASC', () => (
    <SortLabel
      field="size"
      sort={{
        field: 'size',
        direction: 'ASC',
      }}>Size</SortLabel>
  ))
  .add('This field is sorted DESC', () => (
    <SortLabel
      field="size"
      sort={{
        field: 'size',
        direction: 'DESC',
      }}>Name</SortLabel>
  ))
  .add('This field is type `order`', () => (
    <SortLabel
      field="rank"
      fieldType="order"
      sort={{
        field: 'rank',
        direction: 'ASC',
      }}>Rank</SortLabel>
  ))
  .add('This field is type `alpha`', () => (
    <SortLabel
      field="name"
      fieldType="alpha"
      sort={{
        field: 'name',
        direction: 'ASC',
      }}>Name</SortLabel>
  ))

  ;
