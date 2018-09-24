/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, {Link, CloseButton} from '../Button';
import Octicon, { LinkExternal } from '@github/octicons-react';

storiesOf('Bootstrap/Button', module)
  .add('With onClick', () => (
    <Button onClick={action('Clicked!')}>
      Click Me!
    </Button>
  ))
  .add('Disabled', () => (
    <Button onClick={null}>
      Click Me!
    </Button>
  ))
  .add('Success', () => (
    <Button onClick={action('Clicked!')} color="success">
      Click Me!
    </Button>
  ))
  .add('Large', () => (
    <Button onClick={action('Clicked!')} size="lg">
      Click Me!
    </Button>
  ))
  .add('Block', () => (
    <Button onClick={action('Clicked!')} display="block">
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
      <Octicon
        icon={LinkExternal}
        ariaLabel="Open in new window" /> Open External Site
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
      <CloseButton onClick={action('Closed!')} />
    </div>
  ))
  .add('Disabled', () => (
    <div style={closeContainerStyle}>
      <CloseButton onClick={null} />
    </div>
  ));
