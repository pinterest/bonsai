/*
 * @flow
 */

export default function debounce(
  fn: () => void,
  delay: number = 250,
): () => void {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
