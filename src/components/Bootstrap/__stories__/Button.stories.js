/**
 * @flow
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import Button, {Link, CloseButton} from '../Button';
import {getClassName} from '../GlyphiconNames';

storiesOf('Bootstrap/Button', module)
  .add('With onClick', () => (
    <Button onClick={(e) => alert('Clicked!')}>
      Click Me!
    </Button>
  ))
  .add('Disabled', () => (
    <Button onClick={null}>
      Click Me!
    </Button>
  ))
  .add('Success', () => (
    <Button onClick={(e) => alert('Clicked!')} color="success">
      Click Me!
    </Button>
  ))
  .add('Large', () => (
    <Button onClick={(e) => alert('Clicked!')} size="lg">
      Click Me!
    </Button>
  ))
  .add('Block', () => (
    <Button onClick={(e) => alert('Clicked!')} display="block">
      Click Me!
    </Button>
  ))
  .add('Disabled Success', () => (
    <Button onClick={null} color="success">
      Click Me!
    </Button>
  ));

storiesOf('Bootstrap/Link', module)
  .add('With href', () => (
    <Link href="javascript: alert('Linked!');">
      Click Me!
    </Link>
  ))
  .add('Disabled', () => (
    <Link href={null}>
      Click Me!
    </Link>
  ))
  .add('Success', () => (
    <Link href="javascript: alert('Linked!');" color="success">
      Click Me!
    </Link>
  ))
  .add('Large', () => (
    <Link href="javascript: alert('Linked!');" size="lg">
      Click Me!
    </Link>
  ))
  .add('Disabled Success', () => (
    <Link href={null} color="success">
      Click Me!
    </Link>
  ))
  .add('Opens new tab', () => (
    <Link href="example.com" newtab={true}>
      <span className={getClassName('new-window')} /> Open External Site
    </Link>
  ));

const closeContainerStyle = {
  background: '#ddd',
  height: '100px',
  width: '100px',
};

storiesOf('Bootstrap/CloseButton', module)
  .add('With onClick', () => (
    <div style={closeContainerStyle}>
      <CloseButton onClick={(e) => alert('Closed!')} />
    </div>
  ))
  .add('Disabled', () => (
    <div style={closeContainerStyle}>
      <CloseButton onClick={null} />
    </div>
  ));
