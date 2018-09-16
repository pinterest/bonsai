/*
 * @flow
 */

import * as React from 'react';

import Octicon, { Book, MarkGithub } from '@github/octicons-react';

type Props = {
  mode: 'normal' | 'debug',
  onSetAppMode: (mode: 'normal' | 'debug') => void,
}

export default function Navbar(props: Props) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/" onClick={(e: SyntheticEvent<>) => {
        e.preventDefault();
        window.location.hash = '';
        window.location.reload();
      }}>
        Bonsai
      </a>
      <span className="navbar-text">
        Trim your dependency trees
      </span>
      {window.location.hostname === 'localhost'
        ? <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <div className="nav-link">
                <label htmlFor="app-mode">
                  <input
                    type="checkbox"
                    id="app-mode"
                    defaultChecked={props.mode === 'debug' ? 'checked' : ''}
                    value={props.mode === 'debug' ? 'checked' : ''}
                    onClick={(event) => {
                      props.onSetAppMode(event.target.checked ? 'debug' : 'normal')
                    }} />
                  &nbsp;
                  Debug
                </label>
              </div>
            </li>
          </ul>
        :null}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="https://pinterest.github.io/bonsai/">
            <Octicon icon={Book} />
            &nbsp;
            Docs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/pinterest/bonsai">
            <Octicon icon={MarkGithub} />
            &nbsp;
            Github
          </a>
        </li>
      </ul>
    </nav>
  );
}
