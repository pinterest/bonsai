/*
 * @flow
 */

import * as React from 'react';

import Octicon, { Book, MarkGithub } from '@github/octicons-react';


export default function Navbar() {
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
