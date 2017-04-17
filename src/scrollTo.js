/*
 * @flow
 */

export default function scrollTo(target: HTMLElement | string) {
  if (target instanceof HTMLElement) {
    scrollToElem(target);
  } else {
    const elem = document.getElementById(target);
    if (elem) {
      scrollToElem(elem);
    }
  }
}

function findPos(obj: HTMLElement) {
  let curtop = 0;
  let elem = obj;
  if (elem.offsetParent) {
    do {
      if (elem instanceof HTMLElement) {
        curtop += elem.offsetTop;
      }
      elem = elem.offsetParent
    } while (elem);
    return curtop;
  }
  return elem.offsetTop;
}

export function scrollToElem(elem: HTMLElement) {
  const left = 0;
  const top = findPos(elem);
  window.scroll(left, top);
}
