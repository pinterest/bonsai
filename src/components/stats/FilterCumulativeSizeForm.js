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

export default function FilterCumulativeSizeForm(props: Props) {
  return (
    <div className="col-sm-12">
      <label
        className="sr-only"
        htmlFor="filter-cumulativeSize-min">
        Min (bytes)
      </label>
      <label
        className="sr-only"
        htmlFor="filter-cumulativeSize-max">
        Max (bytes)
      </label>
      <div className="input-group">
        <input
          className="form-control"
          style={{width: '100px'}}
          id="filter-cumulativeSize-min"
          onChange={props.onChangeMin}
          placeholder="0 bytes"
          type="text"
          value={props.filters.cumulativeSizeMin}
        />
        <div className="input-group-addon"><code>&lt; size &lt;</code></div>
        <input
          className="form-control"
          style={{width: '100px'}}
          id="filter-cumulativeSize-max"
          onChange={props.onChangeMax}
          placeholder={`${INFINITY} bytes`}
          type="text"
          value={props.filters.cumulativeSizeMax}
         />
      </div>
    </div>
  );
};
