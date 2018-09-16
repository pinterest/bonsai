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
import DebugAssetList from './DebugAssetList';

export type StateProps = {
  file: ?Array<RawStats>,
};

export type DispatchProps = {

};

type Props = StateProps & DispatchProps;

type State = {
  selectedChunkIndex: ?number;
};

export default class DebugView extends React.Component<Props, State> {
  state: State

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedChunkIndex: props.file && props.file.length > 0
        ? 0
        : null,
    };
  }

  render() {
    const props = this.props;

    if (!props.file) {
      return 'No file found';
    }

    return (
      <ChunkList file={props.file} />
    );
  }
}

type ChunkListProps = {
  file: Array<RawStats>,
};

function ChunkList(props: ChunkListProps) {
  return (
    <div>
      <h5>Chunk List</h5>
      <ListGroup>
        {props.file.map((child, index) => {
          return (
            <ListGroupItem key={index}>
              <h5>index={index} - {child.hash}</h5>
              <DebugAssetList child={child} />
              {/* <EntrypointList child={child} /> */}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
