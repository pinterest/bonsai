/*
 * @flow
 */

import type {ParsedJSON, RawStats} from '../types/Stats';

import fetchJSON from '../fetchJSON';
import FileInputContainer from './FileInputContainer';
import Navbar from './Navbar';
import React from 'react';
import Stats from './Stats';
import './App.css'

type Props = {
  dataPaths: Array<string>,
  filename: ?string,
  loading: boolean,
  json: ?RawStats,
  onInitDataPaths: (paths: Array<string>) => void,
  onPickedFile: (filename: ?string) => void,
  onLoadingFailed: () => void,
  onLoaded: (filename: ?string, stats: ?RawStats) => void,
};

export default function App(props: Props) {
  if (props.filename && !props.json) {
    const url = props.filename;
    fetchJSON(url).then((json: ParsedJSON) => {
      props.onLoaded(url, json);
    }).catch((error) => {
      console.error(`Failed while fetching json from '${String(url)}'.`, error);
      props.onLoadingFailed();
    });
  }

  return (
    <div className="App">
      <Navbar />
      <div className="AppFixed">
        <div className="AppView">
          <aside className="container-fluid">
            <FileInputContainer
              filename={props.filename}
              dataPaths={props.dataPaths}
              onInitDataPaths={props.onInitDataPaths}
              onPickedFile={props.onPickedFile}
              onLoadingFailed={props.onLoadingFailed}
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
