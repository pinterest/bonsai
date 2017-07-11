# Build Options

There are a few special environment variables that Bonsai understands. These extras are helpful for custom deploys or if you want to link Bonsai into your own project setup. You can either set your environment variables when you run the `build` command, or via `.env` files. See [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for more information.

- `REACT_APP_EXTERNAL_URL_PREFIX`

  Setting this environment variable will enable links from each module row in Bonsai to some other site.

  Example build command:
  ```bash
  REACT_APP_EXTERNAL_URL_PREFIX=https://github.com/pinterest/bonsai/blob/master/ npm run build
  ```

- `REACT_APP_STATS_URL`

  A url to a stats file that will load immediately on page load. This can replace the need for a JSON endpoint and makes it possible to serve only static files using a simple server like [`serve`](https://github.com/zeit/serve) (or take your pick of [these one liners](https://gist.github.com/willurd/5720255)).

  Example:
  ```bash
  REACT_APP_STATS_URL=./stats.json npm run build

  # put the stats file directly into the build folder
  webpack --json $project_dir > build/stats.json

  server ./build
  ```

- `REACT_APP_API_LIST_ENDPOINT`

  If the list endpoint is not empty then Bonsai will fetch from that URL on pageload. It expects the endpoint to return a JSON object with the `paths` field set to an array of URLs where stats files can be found. This list of paths will appear in a dropdown and when a path is picked Bonsai will fetch from the URL and try to load the resulting stats file into the analyzer.

  The documentation site has an example of how this setting can be used. See [deploy-example.sh](https://github.com/pinterest/bonsai/blob/gh-pages/deploy-example.sh).
