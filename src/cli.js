#!/usr/bin/env node

/**
 * @flow
 */

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')({
    babelrc: false,
    configFile: './.babelrc.cli',
    plugins: [
      [
        'transform-define',
        {
          'process.env.NODE_ENV': process.env.NODE_ENV,
        }
      ],
    ]
  });
}

require('./cli/main').default();
