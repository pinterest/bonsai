/*
 * @flow
 */

export type Color = 'default' | 'primary' | 'success' | 'info' | 'danger';
export type Prefixes = 'btn';

export function colorToClass(prefix: Prefixes, color: ?Color) {
  return `${prefix}-${color || 'default'}`;
}
