/*
 * @flow
 */

export default function debounce(fn: Function, delay: number = 250) {
  let timer = null;
  return function() {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
