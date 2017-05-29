#!/usr/bin/env bash

set -x

stashed=$(git stash -u)
echo $stashed

pages_folder=$(pwd)
user_name=$(git config user.name)
user_email=$(git config user.email)

cd $(mktemp -d)
git clone $pages_folder . --branch master

yarn install --pure-lockfile && yarn run build
rm -rf "$pages_folder/analyse"
mv build "$pages_folder/analyse"

NODE_ENV=development \
REACT_APP_EXTERNAL_URL_PREFIX=https://github.com/pinterest/bonsai/blob/master/ \
    ./node_modules/webpack/bin/webpack.js --json \
    --config ./node_modules/react-scripts/config/webpack.config.dev.js > "$pages_folder/stats.json"

git config user.name $user_name
git config user.email $user_email
git add analyse/ stats.json
git commit -m 'Push the latest Bonsai version to gh-pages with stats.json'
# git push origin

if ! [[ $stashed == 'No local changes'* ]]; then
    git stash pop
fi

rm -rf $(pwd)
