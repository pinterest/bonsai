/*
 * @flow
 */

import React from 'react';

const ELLIPSIS = '\u2026';

function joinWithBR(nodes, label, index) {
  return nodes.concat(label, <br key={index} />);
}

export default function formatModuleName(name: string) {
  const names = name.indexOf('multi ') === 0
    ? name.split(' ')
    : [name];

  return names.map((name, i) => {
    const parts = name.split('!');
    const moduleName = parts.pop();

    const loaders = parts.map((part) => {
      const [loader, query] = part.split('?');
      if (query) {
        const shortQuery = query.length > 14
          ? query.slice(0, 7) + ELLIPSIS + query.slice(-7)
          : query;
        return loader + '?' + shortQuery + '!'
      }
      return loader + '!';
    });

    const title = parts.length
      ? parts.join('') + '!' + moduleName
      : '';

    return [
      title
        ? <span
            key={'a' + i}
            style={{color: '#aaa'}}
            title={title}>{' '}{loaders.join('')}
          </span>
        : null,
        <span
          key={'b' + i}
          title={title}>
          {moduleName}
        </span>,
    ];
  }).reduce(joinWithBR, []);
}
