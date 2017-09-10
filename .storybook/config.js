import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/stories');

  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(req);
}

configure(loadStories, module);
