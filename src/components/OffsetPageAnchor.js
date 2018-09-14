/*
 * @flow
 */

import './OffsetPageAnchor.css';

type MergeProps = {
  className?: string,
};

export default function OffsetPageAnchor(
  anchor: string,
  props: MergeProps = {},
) {
  return {
    ...props,
    className: ['OffsetPageAnchor', props.className].join(' '),
    tabIndex: -1,
    id: anchor,
  };
}
