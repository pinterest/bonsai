/*
 * @flow
 */

import './OffsetPageAnchor.css';

type MergeProps = {
  className?: string,
};

export default function OffsetPageAnchor(anchor: string, props: MergeProps = {}) {
  return {
    ...props,
    className: ['OffsetPageSection', props.className].join(' '),
    tabIndex: -1,
    id: anchor,
  };
}
