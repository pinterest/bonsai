# Bonsai

Trim your javascript dependencies

![What Bonsai looks like](bonsai-interface.png)

Bonsai is an analyser that helps speed up your website by looking at not just module size, but also the size of all the dependencies.

## Getting Started

The quickest way to get started is to generate a stats file locally on your computer, and then use the online analyser at [https://pinterest.github.io/bonsai/analyse](https://pinterest.github.io/bonsai/analyse).

You can generate a stats file by running `webpack --json > stats.json`. Checkout [https://webpack.js.org](https://webpack.js.org/api/cli/#common-options) for more on `--json` and also the `--config` option if you use one.

Then all you need to to is drag+drop that `stats.json` file into the online tool.

Read more about [generating a stats file](stats-files.md).

### Taking Action

Using your knowledge of your project Bonsai will help you can sort, filter, and identify large modules that might not be needed on initial render. Click 'Ignore' to simulate how many dependany bytes will be removed because of one module.

Read more about [analysing your project](analysing.md).

## Running Bonsai

You can clone and run Bonsai from your filesystem or anywhere you have a webserver. The Create React App README recommends [serve](https://github.com/zeit/serve) as a static file server, and it'll work with Bonsai too!

See also [build options](build-options.md).

## Contributing

You can file bugs on github at [bonsai/issues](https://github.com/pinterest/bonsai/issues) or better yet contribute fixes and new features by submitting a [pull request](https://github.com/pinterest/bonsai/pulls).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Contributors can execute `yarn start` to quickly create a development build. There are other helpful scripts listed in [package.json](https://github.com/pinterest/bonsai/blob/master/package.json#L18-L39) to build the project for production and prevent accidental breakages.

The most recent version of the Create React App guide is [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Bonsai is not ejected yet and try to track the latest releases as appropriate.
