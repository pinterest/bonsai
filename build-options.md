# Build Options

There are a few special environment variables that Bonsai understands. These extras are helpful for custom deploys or want to link Bonsai into your own project setup. You can either set your environment variables when you run the build command, or via `.env` files. See [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for more information.

- `REACT_APP_EXTERNAL_URL_PREFIX`
  Setting this environment variable will enable links from each module row in Bonsai to some other site.

  Example:`REACT_APP_EXTERNAL_URL_PREFIX=https://github.com/pinterest/bonsai/blob/master/ npm run build`

- `REACT_APP_API_LIST_ENDPOINT`
  If the list endpoint is not empty then Bonsai will fetch from that url on pageload. It expects the endpoint to return a json object with the `paths` field set to an array of urls where stats files can be found. This list of paths will appear in a dropdown and when a path is picked Bonsai will fetch from the url and try to load the resulting stats file into the analyser.
