/**
 * @flow
 */

export default function flatten(
  arrOfArray: Array<Array<*>>,
): Array<*> {
  return [].concat.apply([], arrOfArray);
}
