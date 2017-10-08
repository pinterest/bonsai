/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Panel from '../Panel';

const TABLE_CONTENT = (
  <table className="table">
    <tbody>
      <tr>
        <th>Table Heading</th>
        <td>Table Cell</td>
      </tr>
    </tbody>
  </table>
);
const LIST_CONTENT = (
  <ul className="list-group">
    <li className="list-group-item">List Item</li>
    <li className="list-group-item">List Item</li>
    <li className="list-group-item">List Item</li>
  </ul>
);

storiesOf('Bootstrap/Panel', module)
  .add('Body only', () => (
    <Panel>
      Panel content
    </Panel>
  ))
  .add('With string heading', () => (
    <Panel
      heading="Panel Title">
      Panel content
    </Panel>
  ))
  .add('With React.Node heading', () => (
    <Panel
      heading={<h2>Panel Title</h2>}>
      Panel content
    </Panel>
  ))
  .add('With single child', () => (
    <Panel
      heading={<h2>Panel Title</h2>}>
      <p>Panel content</p>
    </Panel>
  ))
  .add('With multiple children', () => (
    <Panel
      heading={<h2>Panel Title</h2>}>
      <p>Panel content 1</p>
      <p>Panel content 2</p>
    </Panel>
  ))
  .add('With table child', () => (
    <Panel
      heading={<h2>Panel Title</h2>}>
      {TABLE_CONTENT}
    </Panel>
  ))
  .add('With list-group child', () => (
    <Panel
      heading={<h2>Panel Title</h2>}>
      {LIST_CONTENT}
    </Panel>
  ))
  .add('With mixed content', () => (
    <Panel
      heading={<h2>Panel Title</h2>}>
      <p>Paragraph content 1</p>
      {TABLE_CONTENT}
      <p>Paragraph content 2</p>
      {LIST_CONTENT}
    </Panel>
  ))
  .add('With different Types', () => (
    <div>
      <Panel
        type='default'
        heading="Default Panel Title">
        Panel content
      </Panel>
      <Panel
        type='primary'
        heading="Primary Panel Title">
        Panel content
      </Panel>
      <Panel
        type='success'
        heading="Success Panel Title">
        Panel content
      </Panel>
      <Panel
        type='info'
        heading="Info Panel Title">
        Panel content
      </Panel>
      <Panel
        type='warning'
        heading="Warning Panel Title">
        Panel content
      </Panel>
      <Panel
        type='danger'
        heading="Danger Panel Title">
        Panel content
      </Panel>
    </div>
  ));
