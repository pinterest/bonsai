/**
 * @flow
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../Button';
import Dropdown from '../Dropdown';

const alertOnClick = () => { alert('Clicked me'); };

const getContent = (hideContent: () => void) => {
  return (
    <div className="col-sm-12">
      <Button onClick={() => hideContent()} color="success">
        All Done
      </Button>
    </div>
  );
};

const getListContent = (hideContent: () => void) => {
  return (
    [1, 2, 3, 4, 5].map((i) => (
      <li key={i}>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          hideContent();
          alert(`Clicked ${i}`);
        }}>
          Count: {i}
        </a>
      </li>
    ))
  );
};

storiesOf('Bootstrap/Dropdown', module)
  .add('Basic', () => (
    <Dropdown getContent={getContent}>
      Show flyout
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('Basic Warning', () => (
    <Dropdown getContent={getContent} color="warning">
      Show flyout
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('Basic align right', () => (
    <Dropdown getContent={getContent} align="right">
      Show flyout
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('Basic disabled', () => (
    <Dropdown getContent={getContent} disabled={true}>
      Show flyout
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('Basic custom style', () => (
    <Dropdown getContent={getContent} style={{padding: '10px', background: 'red'}}>
      Show flyout
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('List Content', () => (
    <Dropdown getContent={getListContent}>
      Show list
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('Split Button', () => (
    <Dropdown
      getContent={getContent}
      split={{
        label: 'expand',
        primaryOnClick: alertOnClick,
      }}>
      Show list
    </Dropdown>
  ))
  .add('Split Button w/ Color', () => (
    <Dropdown
      color="success"
      getContent={getContent}
      split={{
        label: 'expand',
        primaryOnClick: alertOnClick,
      }}>
      Show list
    </Dropdown>
  ))
  .add('Split Button w/ Glyph', () => (
    <Dropdown
      getContent={getContent}
      split={{
        label: 'expand',
        primaryOnClick: alertOnClick,
        glyphicon: 'star',
      }}>
      Show list
    </Dropdown>
  ))
  .add('Split Button w/ List Content', () => (
    <Dropdown
      getContent={getListContent}
      split={{
        label: 'expand',
        primaryOnClick: alertOnClick,
      }}>
      Show list
    </Dropdown>
  ));
