/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import FileInputContainer from './FileInputContainer';
import Navbar from './Navbar';
import React from 'react';
import Stats from './Stats';
import './App.css'

type Props = {
  loading: boolean,
  filename: ?string,
  json: ?RawStats,
  onLoading: () => void,
  onLoaded: (filename: ?string, stats: ?RawStats) => void,
};

export default function App(props: Props) {
  return (
    <div className="App">
      <Navbar />
      <div className="AppFixed">
        <div className="AppView">
          <aside className="container-fluid">
            <FileInputContainer
              filename={props.filename}
              onLoading={props.onLoading}
              onLoaded={props.onLoaded}
            />
          </aside>
            {props.loading
              ? <p className="center-block"><em>Loading...</em></p>
              : null}
            {props.json
              ? <Stats json={props.json} />
              : null}
        </div>
      </div>
    </div>
  );
}
