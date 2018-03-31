/*
 * @flow
 */

export default function debounce(
  fn: () => void,
  delay: number = 250,
): () => void {
  let timer: ?TimeoutID = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
