import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/stories');
}

configure(loadStories, module);
