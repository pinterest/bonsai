/*
 * @flow
 */

import type {Color} from './Color';

import Button from './Button';
import Dropdown from './Dropdown';
import * as React from 'react';

type Alignment = 'left' | 'right';

type Size =
  | 'lg'
  | 'sm'
  | 'xs'
  | 'block';

export type ItemValue = string | number;
export type Item = {
  label: string,
  value: ItemValue,
} | {
  node: (hideContent: () => void) => React.Node,
  value: ItemValue,
};

type Props = {
  align?: Alignment,
  color?: Color,
  size?: Size,
  disabled?: boolean,
  scrollable?: boolean,
  style?: Object,

  children: React.Node,

  defaultIsOpen?: boolean,

  items: Array<Item>,
  onItemPicked: (value: ItemValue) => void,
  filter?: (searchTerm: string, item: Item) => boolean,
};

type State = {
  isOpen: boolean,
  filter: string,
};

export default class DropdownList extends React.Component<Props, State> {
  _input: ?HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: Boolean(props.defaultIsOpen),
      filter: '',
    };
  }

  componentDidMount() {
    if (this._input) {
      this._input.focus();
    }
  }

  componentDidUpdate() {
    if (this._input) {
      this._input.focus();
    }
  }

  renderContent = (hideContent: () => void) => {
    const props = this.props;

    return props.items
      .filter((item) => props.filter
        ? props.filter(this.state.filter, item)
        : String(item.label || item.value).toLowerCase().includes(this.state.filter.toLowerCase())
      )
      .map((item) => {
        if (item.label) {
          return (
            <li key={item.value}>
              <Button
                color="link"
                display="block"
                onClick={(e) => {
                  e.preventDefault();
                  hideContent();
                  props.onItemPicked(item.value);
                }}>
                <div className="text-left">
                  {String(item.label)}
                </div>
              </Button>
            </li>
          );
        } else if (typeof item.node === 'function') {
          return (
            <li key={item.value}>
              {item.node(hideContent)}
            </li>
          );
        } else {
          throw new Error('invalid item type');
        }
      });
  };

  render() {
    return (
      <Dropdown
        {...this.props}
        getContent={this.renderContent}
        onToggleOpen={(isOpen: boolean) => {
          this.setState({isOpen});
        }}>
        {this.state.isOpen
          ? <input
            type="text"
            className="form-control input-sm"
            style={{display: 'inline', width: 'auto'}}
            placeholder={typeof this.props.children === 'string'
              ? this.props.children
              : null}
            value={this.state.filter}
            ref={(input) => {
              if (input instanceof HTMLElement) {
                this._input = input;
              }
            }}
            onClick={(e: SyntheticMouseEvent<HTMLInputElement>) => {
              e.stopPropagation();
            }}
            onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
              this.setState({ filter: e.target.value });
            }}
          />
          : this.props.children}
        {' '}
        <span className="caret"></span>
      </Dropdown>
    );
  }
}
