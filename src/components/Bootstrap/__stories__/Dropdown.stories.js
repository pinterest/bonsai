/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../Button';
import Dropdown from '../Dropdown';
import { Star } from '@github/octicons-react';

const alertOnClick = () => { alert('Clicked me'); };
const noop = () => undefined;
const range = (start: number, end: number): Array<number> => {
  return [...Array(end - start).keys()].map(i => Number(i) + start);
};

const getContent = (hideContent: () => void) => {
  return (
    <div className="col-sm-12">
      <Button onClick={hideContent} color="success">
        All Done
      </Button>
    </div>
  );
};

const getListContent = (length: number) => {
  return (hideContent: () => void) => {
    return (
      range(1, length + 1).map((i) => (
        <li key={i}>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            hideContent();
            action(`Clicked ${i}`)(e);
          }}>
            Count: {i}
          </a>
        </li>
      ))
    );
  };
};

storiesOf('Bootstrap/Dropdown', module)
  .add('Basic', () => (
    <Dropdown getContent={getContent}>
      Show flyout
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('Basic isOpen', () => (
    <Dropdown getContent={getContent} defaultIsOpen={true}>
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
    <Dropdown getContent={getListContent(5)}>
      Show list
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('List Content isOpen', () => (
    <Dropdown getContent={getListContent(5)} defaultIsOpen={true} scrollable={true} >
      Show list
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('List with long content', () => (
    <Dropdown getContent={getListContent(40)} defaultIsOpen={true} scrollable={true} >
      Show list
      {' '}
      <span className="caret"></span>
    </Dropdown>
  ))
  .add('List with long content on long page', () => (
    <div>
      <ul>
        {getListContent(10)(noop)}
      </ul>
      <Dropdown getContent={getListContent(40)} defaultIsOpen={true} scrollable={true} >
        Show list
        {' '}
        <span className="caret"></span>
      </Dropdown>
      <ul>
        {getListContent(60)(noop)}
      </ul>
    </div>
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
        octicon: Star,
      }}>
      Show list
    </Dropdown>
  ))
  .add('Split Button w/ List Content', () => (
    <Dropdown
      getContent={getListContent(5)}
      split={{
        label: 'expand',
        primaryOnClick: alertOnClick,
      }}>
      Show list
    </Dropdown>
  ));
