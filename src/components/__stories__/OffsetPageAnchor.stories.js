/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import OffsetPageAnchor from '../OffsetPageAnchor';
import scrollToAndFocus from '../../utils/scrollToAndFocus';

const to100 = {
  *[Symbol.iterator]() {
    for (let i = 0; i < 100; i++) {
      yield i;
    }
  },
  length: 100,
};

storiesOf('OffsetPageAnchor', module)
  .add('Default', () => (
    <table style={{width: '100%'}}>
      <tbody>
        <tr {...OffsetPageAnchor('one')}>
          <td>
            One
          </td>
          <td>
            <button onClick={() => {
              scrollToAndFocus('One');
            }}>Highlight Me</button>
          </td>
        </tr>
        <tr {...OffsetPageAnchor('two')}>
          <td>
            Two
          </td>
          <td>
            <button onClick={() => {
              scrollToAndFocus('two');
            }}>Highlight Me</button>
          </td>
        </tr>
      </tbody>
    </table>
  ))
  .add('Scrolling', () => (
    <table style={{width: '100%'}}>
      <tbody>
        {Array.from(to100).map((i) => (
          <tr key={i} {...OffsetPageAnchor(String(i))}>
            <td>
              {i}
            </td>
            <td>
              <button onClick={() => {
                scrollToAndFocus(String(99 - Number(i || 0)));
              }}>Highlight {99 - Number(i || 0)}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ));
