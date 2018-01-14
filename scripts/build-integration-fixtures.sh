#!/usr/bin/env bash

set -e

cd "$(dirname $0)/.."

mkdir -p ./scripts/built-integration-fixtures

echo "Collecting webpack json stats..."

webpack=./node_modules/webpack/bin/webpack.js

time NODE_ENV=production $webpack --json --config \
  ./src/__test_helpers__/prod-config.js > ./scripts/built-integration-fixtures/prod-config.json
echo "Collected stats for prod-config"

time NODE_ENV=production $webpack --json --config \
  ./src/__test_helpers__/multi-config.js > ./scripts/built-integration-fixtures/multi-config.json
echo "Collected stats for multi-config"
