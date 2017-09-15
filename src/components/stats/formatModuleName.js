/*
 * @flow
 */

import * as React from 'react';

const ELLIPSIS = '\u2026';

function joinWithBR(nodes, label, index, values) {
  if (index === values.length - 1) {
    return nodes.concat(label);
  } else {
    return nodes.concat(label, <br key={index} />);
  }
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
        return loader + '?' + shortQuery + '!';
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
      title
        ? <span key={'b' + i}
          title={title}>
          {moduleName}
        </span>
        : <span key={'b' + i}>
          {moduleName}
        </span>,
    ];
  }).filter(_ => _).reduce(joinWithBR, []);
}
