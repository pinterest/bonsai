#!/usr/bin/env bash

set -x

git fetch origin master:master

stashed=$(git stash -u)
echo $stashed

pages_folder=$(pwd)

cd $(mktemp -d)
git clone $pages_folder . --branch master

yarn install --pure-lockfile

NODE_ENV=production \
    REACT_APP_API_LIST_ENDPOINT=/bonsai/stats-index.json \
    REACT_APP_EXTERNAL_URL_PREFIX=https://github.com/pinterest/bonsai/blob/master/ \
    yarn run build

rm -rf "$pages_folder/analyze"
mv build "$pages_folder/analyze"

NODE_ENV=production \
    ./node_modules/webpack/bin/webpack.js --json \
    --config ./node_modules/react-scripts/config/webpack.config.prod.js > "$pages_folder/stats.json"

rm -rf $(pwd)

cd $pages_folder

git add -A .
git commit -m 'Push the latest Bonsai version to gh-pages with stats.json'
git push origin

if ! [[ $stashed == 'No local changes'* ]]; then
    git stash pop
fi
