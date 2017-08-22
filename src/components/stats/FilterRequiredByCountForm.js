/*
 * @flow
 */

import type {FilterProps} from '../../stats/filterModules';

import React from 'react';

const INFINITY = '\u221E';

type Props = {
  filters: FilterProps,
  onChangeMin: (event: SyntheticInputEvent) => void,
  onChangeMax: (event: SyntheticInputEvent) => void,
};

export default function FilterRequiredByCountForm(props: Props) {
  return (
    <div className="col-sm-12">
      <label
        className="sr-only"
        htmlFor="filter-requiredByCount-min">
        Min (bytes)
      </label>
      <label
        className="sr-only"
        htmlFor="filter-requiredByCount-max">
        Max (bytes)
      </label>
      <div className="input-group">
        <input
          className="form-control"
          style={{width: '100px'}}
          id="filter-requiredByCount-min"
          onChange={props.onChangeMin}
          placeholder="0"
          type="text"
          value={props.filters.requiredByCountMin}
        />
        <div className="input-group-addon"><code>&lt; requirements &lt;</code></div>
        <input
          className="form-control"
          style={{width: '100px'}}
          id="filter-requiredByCount-max"
          onChange={props.onChangeMax}
          placeholder={INFINITY}
          type="text"
          value={props.filters.requiredByCountMax}
        />
      </div>
    </div>
  );
}
