#!/usr/bin/env bash

if [ -z "$@" ]; then
  branch=$(git rev-parse --abbrev-ref HEAD)
  sha=$(git rev-parse --short HEAD)
  timestamp=$(date +%s)
  filename="./public/data/stats-$branch-$sha-$timestamp.json"
else
  filename="./public/data/$@.json"
fi

echo "Saving to $filename"

scp dev:~/code/pinboard/webapp/build/stats/stats.json ./public/data/$filename.json

echo 'Done'
