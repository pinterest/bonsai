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
import flatten from '../../utils/flatten';
import OffsetPageAnchor from '../OffsetPageAnchor';
import * as React from 'react';
import Unit from '../Unit';
import Octicon, { TriangleRight, TriangleDown } from '@github/octicons-react';
import {
  RequiredByPanelContainer,
  RequirementsPanelContainer,
} from './ModulePanelContainers';

import './ModuleTableBody.css';

export type StateProps = {
  rows: Array<RowRepresentation>,
  expandMode: 'manual' | 'collapse-all' | 'expand-all',
  expandedRecords: Set<ModuleID>,
};

export type DispatchProps = {
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

type TBodyProps = StateProps & DispatchProps;

type GroupedTRProps = {
  row: RowRepresentation,
  expanded: boolean,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

type TRProps = {
  row: RowRepresentation,
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
    <span className="float-right">
      <Button
        color="link"
        size="xs"
        onClick={callback}>
        <Octicon icon={expanded ? TriangleDown : TriangleRight} />
        &nbsp;
        {`${recordCount} unique imports`}
      </Button>
    </span>
  );
}

function ModuleTableGroupedRows(props: GroupedTRProps): Array<*> {
  return props.expanded
    ? props.row.records.map((record) => (
      <ModuleTableRow
        key={record.id}
        row={{
          ...props.row,
          displayModule: record,
        }}
        expanded={props.expanded}
        onRemoveModule={props.onRemoveModule}
        onExpandRecords={props.onExpandRecords}
        onCollapseRecords={props.onCollapseRecords}
      />
    ))
    : [
      <ModuleTableRow
        key={props.row.displayModule.id}
        row={props.row}
        expanded={props.expanded}
        onRemoveModule={props.onRemoveModule}
        onExpandRecords={props.onExpandRecords}
        onCollapseRecords={props.onCollapseRecords}
      />
    ];
}

function ModuleTableRow(props: TRProps) {
  const eModule = props.row.displayModule;
  const records = props.row.records;
  const collapsedSizeBytes = props.row.collapsedSizeBytes;

  const moduleSizeBytes = props.expanded
    ? eModule.size
    : collapsedSizeBytes;

  const hasCollapsedChildren = records.length > 1;
  const isFirstRecord = eModule.id === records[0].id;
  const uniqueImports = (hasCollapsedChildren && isFirstRecord)
    ? getExpandButton(
      props.expanded,
      records.length - 1,
      props.expanded
        ? () => props.onCollapseRecords(eModule.id)
        : () => props.onExpandRecords(eModule.id)
    )
    : null;

  return (
    <tr
      key={eModule.id}
      {...OffsetPageAnchor(String(eModule.id), {
        className: [
          'ModuleTableBody-row',
          props.expanded && records.length > 1
            ? 'ModuleTableBody-expanded-border'
            : null,
        ].join(' ')
      })}
    >
      {process.env.REACT_APP_EXTERNAL_URL_PREFIX
        ? <td className="align-middle">
          <ExternalModuleLink
            prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
            module={eModule}
          />
        </td>
        : null}
      <td className="align-middle ModuleTableBody-main-cell">
        {uniqueImports}
        {formatModuleName(eModule.name)}
      </td>
      <Unit
        elem='td'
        className="align-middle text-right"
        bytes={eModule.cumulativeSize} />
      <Unit
        elem='td'
        className="align-middle text-right"
        bytes={moduleSizeBytes} />
      <td className="align-middle text-right">
        <RequiredByPanelContainer eModule={eModule} />
      </td>
      <td className="align-middle text-right">
        <RequirementsPanelContainer eModule={eModule} />
      </td>
      <td className="align-middle">
        <Button size='sm' onClick={() => props.onRemoveModule(eModule.id)}>
          Ignore
        </Button>
      </td>
    </tr>
  );
}

export default function ModuleTableBody(props: TBodyProps) {
  return (
    <tbody>
      {flatten(
        props.rows.map((row: RowRepresentation) => ModuleTableGroupedRows({
          row: row,
          expanded: props.expandMode === 'expand-all' ||
            (props.expandMode === 'manual' && props.expandedRecords.has(row.displayModule.id)),
          onRemoveModule: props.onRemoveModule,
          onExpandRecords: props.onExpandRecords,
          onCollapseRecords: props.onCollapseRecords,
        }))
      )}
    </tbody>
  );
}
