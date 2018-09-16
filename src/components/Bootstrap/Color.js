/*
 * @flow
 */

export type Color =
  | 'default'
  | 'light'
  | 'dark'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'link'
  | 'outline-secondary';

export type Prefixes = 'btn';

export function colorToClass(
  prefix: Prefixes,
  color: ?Color,
  fallback: Color = 'light',
) {
  if (color === 'default') {
    return `${prefix}-light`;
  }
  return `${prefix}-${color || fallback}`;
}
