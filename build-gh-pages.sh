#!/bin/bash

if [ -z "$TRAVIS_BRANCH" ] || [ "$TRAVIS_BRANCH" == "master" ]; then
    NODE_ENV=production \
        PUBLIC_URL=https://pinterest.github.io/bonsai/analyze/ \
        REACT_APP_API_LIST_ENDPOINT=/bonsai/example-index.json \
        REACT_APP_EXTERNAL_URL_PREFIX= \
        yarn run build && \
        mv build docs/analyze
    NODE_ENV=production \
        ./node_modules/webpack/bin/webpack.js --json \
        --config ./node_modules/react-scripts/config/webpack.config.prod.js > "docs/example.json"
    yarn run build-storybook -- -o "docs/storybook"
fi
