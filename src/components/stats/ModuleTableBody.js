/*
 * @flow
 */

import type {
  ModuleID,
  ExtendedModule,
  RowRepresentation,
} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
import formatModuleName from './formatModuleName';
import flatten from '../../flatten';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React from 'react';
import Unit from '../Unit';
import {getClassName} from '../Bootstrap/GlyphiconNames';
import {
  RequiredByPanel,
  RequirementsPanel,
} from './ModulePanels';

import './ModuleTableBody.css'

type TBodyProps = {
  rows: Array<RowRepresentation>,
  expandRecords: Set<ModuleID>,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

type GroupedTRProps = {
  row: RowRepresentation,
  expanded: boolean,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

type TRProps = {
  eModule: ExtendedModule,
  records: Array<ExtendedModule>,
  expanded: boolean,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

function getExpandButton(
  expanded: boolean,
  recordCount: number,
  callback: Function,
) {
  return (
    <Button
      color="link"
      size="xs"
      onClick={callback}>
      <span
        className={expanded
          ? getClassName('triangle-bottom')
          : getClassName('triangle-right')}
        aria-hidden="true"></span>
      {`${recordCount} unique imports`}
    </Button>
  );
}

function ModuleTableGroupedRow(props: GroupedTRProps) {
  return props.expanded
    ? props.row.records.map((record) => (
        ModuleTableRow({
          size: 'sm',
          eModule: record,
          records: props.row.records,
          expanded: props.expanded,
          onRemoveModule: props.onRemoveModule,
          onExpandRecords: props.onExpandRecords,
          onCollapseRecords: props.onCollapseRecords,
        })
      ))
    : [
        ModuleTableRow({
          size: null,
          eModule: props.row.displayModule,
          records: props.row.records,
          expanded: props.expanded,
          onRemoveModule: props.onRemoveModule,
          onExpandRecords: props.onExpandRecords,
          onCollapseRecords: props.onCollapseRecords,
        })
      ];
}

function ModuleTableRow(props: TRProps) {
  const eModule = props.eModule;
  const records = props.records;

  const moduleSize = props.expanded
    ? <Unit bytes={eModule.size} />
    : <Unit
        bytes={records.reduce((sum, eModule) => sum + eModule.size, 0)}
      />;

  const hasCollapsedChildren = records.length > 1;
  const isFirstRecord = eModule.id === records[0].id;
  const requirements = (hasCollapsedChildren && isFirstRecord)
    ? getExpandButton(
        props.expanded,
        records.length - 1,
        props.expanded
          ? () => props.onCollapseRecords(eModule.id)
          : () => props.onExpandRecords(eModule.id)
      )
    : <RequirementsPanel eModule={eModule} />;

  return (
    <tr
      key={eModule.id}
      {...OffsetPageAnchor(String(eModule.id), {
        className: [
          'ModuleTableBody-row',
          props.expanded
            ? 'ModuleTableBody-expanded-border'
            : null,
        ].join(' ').trim()
      })}
      >
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
        {moduleSize}
      </td>
      <td className="vert-align">
        <RequiredByPanel eModule={eModule} />
      </td>
      <td className="vert-align">
        {requirements}
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
      {flatten(
        props.rows.map((row: RowRepresentation) => ModuleTableGroupedRow({
          row: row,
          expanded: props.expandRecords.has(row.displayModule.id),
          onRemoveModule: props.onRemoveModule,
          onExpandRecords: props.onExpandRecords,
          onCollapseRecords: props.onCollapseRecords,
        }))
      )}
    </tbody>
  );
}
