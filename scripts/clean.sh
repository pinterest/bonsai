#!/usr/bin/env bash

set -e

cd "$(dirname $0)/.."

rm -Rf \
  bin \
  build \
  coverage \
  docs/analyze \
  docs/example.json \
  docs/storybook \
  flow-coverage \
  lib \
  npm-debug.log \
  src/integration/tmp \
  storybook-static
