#!/usr/bin/env bash

set -e

cd "$(dirname $0)/.."

rm -rf ./scripts/clone-webpack
git clone --depth 1 git@github.com:webpack/webpack.git ./scripts/clone-webpack
cp ./scripts/template-webpack-build-common.js ./scripts/clone-webpack/examples/build-common.js

cd ./scripts/clone-webpack
yarn install
npm link webpack
npm run build:examples
npm unlink webpack
cd ../..

rm -rf ./dev-server/api/built-webpack-examples
mkdir -p ./dev-server/api/built-webpack-examples
find ./scripts/clone-webpack/examples -type f -name "stats-*.json" -exec mv {} ./dev-server/api/built-webpack-examples \;
