/*
 * @flow
 */

import * as React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/" onClick={(e: SyntheticEvent<>) => {
            e.preventDefault();
            window.location.reload();
          }}>
            Bonsai
          </a>
          <p className="navbar-text">
            Trim your dependency trees
          </p>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a className="navbar-link" href="https://pinterest.github.io/bonsai/">
              Docs
            </a>
          </li>
          <li>
            <a className="navbar-link" href="https://github.com/pinterest/bonsai">
              Github
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
