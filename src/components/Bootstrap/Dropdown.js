/*
 * @flow
 */

import type {Color} from './Color';
import Octicon, { typeof Icon, TriangleDown } from '@github/octicons-react';
import Button, {DropdownToggleButton} from './Button';
import * as React from 'react';

type Alignment = 'left' | 'right';

type Size =
  | 'lg'
  | 'sm'
  | 'xs'
  | 'block';

export type Props = {
  align?: Alignment,
  color?: Color,
  size?: Size,
  disabled?: boolean,
  scrollable?: boolean,
  style?: Object,

  children?: React.Node,

  getContent: (hideContent: () => void) => React.Node,
  defaultIsOpen?: boolean,
  onToggleOpen?: (isOpen: boolean) => void,

  split?: {
    primaryOnClick: (e: MouseEvent) => void,
    label: React.Node,
    octicon?: Icon,
  },
};

type State = {
  isOpen: boolean,
  waitForDropdownMenu: boolean, // invoke a re-render when scrollable and isOpen are true during mount
};

const DROPDOWN_VERTICAL_MARGIN_TOTAL = 22; // top&bottom margin of .dropdown-menu

function sizeToClass(size: ?Size) {
  if (!size) {
    return null;
  }
  return `btn-${size}`;
}

export default class Dropdown extends React.Component<Props, State> {
  state: State;
  _dropDownMenu: ?HTMLElement = null;
  _flyout: ?HTMLElement = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: Boolean(props.defaultIsOpen),
      waitForDropdownMenu: Boolean(props.defaultIsOpen) && Boolean(props.scrollable),
    };
  }

  componentDidMount() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.onDocumentClick);

      if (this.state.waitForDropdownMenu) {
        // force a re-render during mount to properly measure _dropDownMenu
        this.setState({
          waitForDropdownMenu: false,
        });
      }
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.isOpen && !prevState.isOpen) {
      document.addEventListener('click', this.onDocumentClick);
    } else if (!this.state.isOpen) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  isOpen() {
    return this.state.isOpen;
  }

  render() {
    const isOpenClass = this.state.isOpen ? 'open': '';
    return (
      <div
        className={[
          'btn-group',
          isOpenClass,
          sizeToClass(this.props.size),
        ].join(' ')}
        ref={(div) => {
          this._dropDownMenu = div;
        }}
        style={this.props.style}>
        {this.props.split
          ? <Button
            color={this.props.color}
            size={this.props.size}
            onClick={this.props.disabled
              ? null
              : this.props.split.primaryOnClick}>
            {this.props.children}
          </Button>
          : null}
        <DropdownToggleButton
          color={this.props.color}
          size={this.props.size}
          isOpen={this.state.isOpen}
          onClick={this.props.disabled
            ? null
            : this.onClickToggle}>
          {this.renderToggleLabel()}
        </DropdownToggleButton>
        {this.state.isOpen
          ? this.renderContent()
          : null}
      </div>
    );
  }

  renderToggleLabel() {
    if (this.props.split) {
      const split = this.props.split;
      if (split.octicon) {
        return [
          <Octicon key="icon" icon={split.octicon} />,
          <span key="label" className="sr-only">{split.label}</span>,
        ];
      } else {
        return [
          <Octicon key="icon" icon={TriangleDown} />,
          <span key="label" className="sr-only">{split.label}</span>,
        ];
      }
    } else {
      return this.props.children;
    }
  }

  getScrollableProps() {
    if (!this.props.scrollable) {
      return {};
    }

    if (
      !document ||
      !document.documentElement ||
      !this._dropDownMenu
    ) {
      return {};
    }

    const clientHeight = document.documentElement.clientHeight;
    if (!clientHeight) {
      return {};
    }

    const dropDownBounds = this._dropDownMenu.getBoundingClientRect();
    const maxHeight = clientHeight - dropDownBounds.top - dropDownBounds.height - DROPDOWN_VERTICAL_MARGIN_TOTAL;

    return {
      style: {
        maxHeight: maxHeight,
        overflow: 'scroll',
      },
      onWheel: this.onFlyoutWheel,
    };
  }

  renderContent() {
    const classNames = [
      'dropdown-menu',
      this.props.align === 'right' ? 'dropdown-menu-right' : '',
    ].join(' ');

    const content = this.props.getContent(this.onHide);
    if (Array.isArray(content)) {
      return (
        <ul
          className={classNames}
          {...this.getScrollableProps()}
          ref={(ul) => {
            this._flyout = ul;
          }}>
          {content}
        </ul>
      );
    } else {
      return (
        <div
          className={classNames}
          {...this.getScrollableProps()}
          ref={(div) => {
            this._flyout = div;
          }}>
          {content}
        </div>
      );
    }
  }

  onHide = () => {
    this.setState({isOpen: false}, () => {
      this.props.onToggleOpen && this.props.onToggleOpen(this.state.isOpen);
    });
  };

  onClickToggle = () => {
    this.setState({isOpen: !this.state.isOpen}, () => {
      this.props.onToggleOpen && this.props.onToggleOpen(this.state.isOpen);
    });
  };

  onDocumentClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (this._dropDownMenu && this._dropDownMenu.contains(event.target)) {
        // Ignore clicks coming from inside this component
        return;
      }
      if (this.state.isOpen) {
        this.setState({isOpen: false}, () => {
          this.props.onToggleOpen && this.props.onToggleOpen(this.state.isOpen);
        });
      }
    }
  };

  onFlyoutWheel = (event: SyntheticWheelEvent<HTMLElement>) => {
    if (!this._flyout) {
      return;
    }
    const scrollTop = this._flyout.scrollTop;
    const maxScroll = this._flyout.scrollHeight - this._flyout.offsetHeight;
    const deltaY = event.deltaY;

    if (
      (scrollTop === maxScroll && deltaY > 0) ||
      (scrollTop === 0 && deltaY < 0)
    ) {
      event.preventDefault();
      return;
    }

    if (
      (scrollTop + deltaY) > maxScroll &&
      this._flyout.scrollTop !== maxScroll
    ) {
      this._flyout.scrollTop = maxScroll;
      event.preventDefault();
      return;
    }

    if (
      (scrollTop + deltaY) < 0 &&
      this._flyout.scrollTop !== 0
    ) {
      this._flyout.scrollTop = 0;
      event.preventDefault();
      return;
    }
  };
}
