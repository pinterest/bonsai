/*
 * @flow
 */

import React from 'react';

function joinWithBR(nodes, label, index) {
  return nodes.concat(label, <br key={index} />);
}

export default function formatModuleName(name: string) {
  const names = name.indexOf('multi ') === 0
    ? name.split(' ')
    : [name];

  return names.map((name, i) => {
    const bits = name.split('!');
    const niceName = bits.pop();
    bits.push('');
    return [
      <span key={'a' + i} style={{color: '#aaa'}}> {bits.join('!')}</span>,
      <span key={'b' + i}>{niceName}</span>,
    ];
  }).reduce(joinWithBR, []);
}
