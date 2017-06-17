/**
 * @flow
 */

import type {Module} from '../../../types/Stats';

import React from 'react';
import { storiesOf } from '@storybook/react';

import ExternalModuleLink from '../ExternalModuleLink';

const MODULE: Module = {
  "id": "../../../../../app/analytics/modules/AnalyticsMetric/AnalyticsMetric.js",
  "identifier": "/mnt/pinboard/webapp/node_modules/babel-loader/lib/index.js?comments=false&cacheDirectory=/mnt/pinboard/webapp/build/.babel-cache!/mnt/pinboard/webapp/app/analytics/modules/AnalyticsMetric/AnalyticsMetric.js",
  "name": "./app/analytics/modules/AnalyticsMetric/AnalyticsMetric.js",
  "index": 4214,
  "index2": 4217,
  "size": 1677,
  "cacheable": true,
  "built": false,
  "optional": false,
  "prefetched": false,
  "chunks": [
    161
  ],
  "assets": [],
  "issuer": "/mnt/pinboard/webapp/node_modules/babel-loader/lib/index.js?comments=false&cacheDirectory=/mnt/pinboard/webapp/build/.babel-cache!/mnt/pinboard/webapp/app/analytics/modules/index.js",
  "issuerId": "../../../../../app/analytics/modules/index.js",
  "issuerName": "./app/analytics/modules/index.js",
  "failed": false,
  "errors": 0,
  "warnings": 0,
  "reasons": [],
  "usedExports": true,
  "providedExports": [
    "default"
  ],
  "depth": 2
};

const stories = storiesOf('ExternalModuleLink', module)
  .add('Default', () => (
    <ExternalModuleLink prefix={'http://example.com/'} module={MODULE} />
  ))
  .add('No prefix', () => (
    <ExternalModuleLink prefix={null} module={MODULE} />
  ));
