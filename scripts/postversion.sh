#!/usr/bin/env bash

set -e

cd "$(dirname $0)/.."

git push --tags
git merge master
git push origin
