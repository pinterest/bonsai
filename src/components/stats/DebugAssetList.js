/**
 * @flow
 */

import type {ChunkID, ModuleID, RawStats} from '../../types/Stats';

import {
  ListGroup,
  ListGroupItem,
  Button,
  CardBody,
  Card,
  Badge,
} from 'reactstrap';
import * as React from 'react';
import Unit from '../Unit';

function not(fn) {
  return function(...args) {
    return !fn(...args);
  };
}

function isJSAsset(asset) {
  return asset.name.endsWith('.js');
}

function sum(a, b) {
  return a + b;
}

export default class DebugAssetList extends React.Component<any, any> {
  state = {
    show: false,
    showjs: false,
    showother: false,
  };

  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <Button size="sm" onClick={() => {
          this.setState({
            show: !this.state.show,
          });
        }}>
          Show Assets
        </Button>
        {this.state.show ? this.renderData() : null}
      </React.Fragment>
    );
  }

  renderData() {
    const props = this.props;
    const jsAssets = props.child.assets.filter(isJSAsset)
    const otherAssets = props.child.assets.filter(not(isJSAsset));
    const jsAssetSizes = jsAssets.map(asset => asset.size);

    const jsAssetSizeMed = jsAssetSizes.reduce(sum, 0) / jsAssetSizes.length;

    return (
      <Card>
        <CardBody>
          <h5>Js Assets (count = {jsAssets.length})</h5>
          <p>Average Size: <Unit bytes={jsAssetSizeMed} /></p>
          <Button size="sm" onClick={() => {
            this.setState({
              showjs: !this.state.showjs,
            });
          }}>
            Show JS Assets
          </Button>
          {this.state.showjs
            ? <ListGroup>
                {jsAssets.map((asset, i) => (
                  <ListGroupItem key={i}>
                    {asset.name}
                    <Badge>
                      <Unit bytes={asset.size} />
                    </Badge>
                  </ListGroupItem>
                ))}
              </ListGroup>
            : null}

          <h5>Other Assets (count = {otherAssets.length})</h5>
          <Button size="sm" onClick={() => {
            this.setState({
              showother: !this.state.showother,
            });
          }}>
            Show JS Assets
          </Button>
          {this.state.showother
            ? <ListGroup>
                {otherAssets.map((asset, i) => (
                  <ListGroupItem key={i}>
                    {asset.name}
                    <Badge>
                      <Unit bytes={asset.size} />
                    </Badge>
                  </ListGroupItem>
                ))}
              </ListGroup>
            : null}
        </CardBody>
      </Card>
    );
  }
}
