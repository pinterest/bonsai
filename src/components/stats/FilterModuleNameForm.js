/*
 * @flow
 */

import type {FilterProps} from '../../stats/filterModules';

import React from 'react';

type Props = {
  filters: FilterProps,
  onChange: (event: SyntheticInputEvent) => void,
};

export default function FilterModuleNameForm(props: Props) {
  return (
    <div className="col-sm-12">
      <label className="sr-only" htmlFor="filter-moduleName-like">Matches RegExp</label>
      <div className="input-group">
        <div className="input-group-addon"><code>new RegExp(</code></div>
        <input
          className="form-control"
          id="filter-moduleName-like"
          onChange={props.onChange}
          placeholder=".*"
          type="text"
          value={props.filters.moduleName || ''}
        />
        <div className="input-group-addon"><code>)</code></div>
      </div>
    </div>
  );
};

