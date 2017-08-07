/*
 * @flow
 */

import type {
  ModuleID,
  RowRepresentation,
} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
import formatModuleName from './formatModuleName';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React from 'react';
import Unit from '../Unit';
import {getClassName} from '../Bootstrap/GlyphiconNames';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

type TBodyProps = {
  rows: Array<RowRepresentation>,
  onRemoveModule: (moduleID: ModuleID) => void,
};

type TRProps = {
  row: RowRepresentation,
  onRemoveModule: (moduleID: ModuleID) => void,
};

function ModuleTableRow(props: TRProps) {
  const eModule = props.row.displayModule;
  return (
    <tr key={eModule.id} {...OffsetPageAnchor(String(eModule.id))}>
      <td className="vert-align">
        <ExternalModuleLink
          prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
          module={eModule}
        />
      </td>
      <td className="vert-align">
        {eModule.loops.length
          ? <span
              className={['pull-right', getClassName('repeat')].join(' ')}
              title="Circular Dependencies Detected"
            />
          : null}
        {formatModuleName(eModule.name)}
      </td>
      <td className="vert-align">
        <Unit bytes={eModule.cumulativeSize} />
      </td>
      <td className="vert-align">
        <Unit bytes={eModule.size} />
      </td>
      <td className="vert-align">
        <RequiredByPanel eModule={eModule} />
      </td>
      <td className="vert-align">
        <RequirementsPanel eModule={eModule} />
      </td>
      <td className="vert-align">
        <Button onClick={() => props.onRemoveModule(eModule.id)}>
          Ignore
        </Button>
      </td>
    </tr>
  );
}

export default function(props: TBodyProps) {
  return (
    <tbody>
      {props.rows.map((row: RowRepresentation) =>
        <ModuleTableRow
          key={row.displayModule.id}
          row={row}
          onRemoveModule={props.onRemoveModule}
        />
      )}
    </tbody>
  );
}
