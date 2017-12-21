#!/usr/bin/env bash

set -e

cd "$(dirname $0)/.."

mkdir -p ./src/integration/tmp

echo "Collecting webpack json stats..."

webpack=./node_modules/webpack/bin/webpack.js

time NODE_ENV=production $webpack --json --config ./src/__test_helpers__/prod-config.js > ./src/integration/tmp/prod-config.json
echo "Collected stats for prod-config"

time NODE_ENV=production $webpack --json --config ./src/__test_helpers__/multi-config.js > ./src/integration/tmp/multi-config.json
echo "Collected stats for multi-config"
