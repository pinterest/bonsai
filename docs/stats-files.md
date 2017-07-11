# Webpack Stats File

For simple Webpack projects you can generate a stats file using `webpack --json > stats.json`. This will create `stats.json` in your current directory with all the data from your project. If you have a custom configuration you might need to tell webpack about that, `webpack --json --config webpack.config.js > stats.json`. See [https://webpack.js.org](https://webpack.js.org/api/cli/#common-options) for more help.

## What's in the stats file?

As example of the stats file can be found inside the Bonsai repo itself [right here](https://github.com/pinterest/bonsai/blob/gh-pages/stats.json).

The stats file contains full file paths, the file sizes, and the relationships between each of the modules in your project. The [online Bonsai analyser](https://pinterest.github.io/bonsai/analyze) reads this data locally in your browser and doesn't upload anything.

## Other tools

There are some other tools that have preceded Bonsai, and might also be helpful in your project.

- Webpack has an [analyze tool](http://webpack.github.io/analyze/) that nicely presents the content of the stats file and offers hints that can improve bundling.

- [Chrisbateman's webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/) and [th0r's webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) both show each file as a fraction of the bundle total, in different and stylish ways.
