/*
 * @flow
 */

export default function scrollToAndFocus(target: HTMLElement | string) {
  const elem = scrollTo(target);
  if (elem) {
    elem.focus();
  }
}

export function scrollTo(target: HTMLElement | string): ?HTMLElement {
  if (target instanceof HTMLElement) {
    scrollToElem(target);
    return target;
  } else {
    const elem = document.getElementById(target);
    if (elem) {
      scrollToElem(elem);
      return elem;
    }
  }
  return null;
}

function getScrollParent(element: HTMLElement, includeHidden: boolean = false): HTMLElement | null {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === "absolute";
  var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === "fixed") {
    return document.body;
  }
  // eslint-disable-next-line no-cond-assign
  for (var parent = element; (parent = parent.parentElement);) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent instanceof HTMLElement
        ? parent
        : null;
    }
  }

  return document.body;
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

function isWithinViewport(
  viewportTop: number,
  viewportHeight: number,
  targetTop: number,
  targetHeight: number,
): boolean {
  return (
    viewportTop < targetTop &&
    targetTop < viewportTop + viewportHeight - targetHeight
  );
}

export function scrollToElem(elem: HTMLElement) {
  const left = 0;
  const top = findPos(elem);
  const scrollParent = getScrollParent(elem);
  if (scrollParent) {
    if (scrollParent === document.body) {
      if (!isWithinViewport(
        window.scrollY,
        window.innerHeight,
        top,
        elem.offsetHeight,
      )) {
        window.scroll(left, top);
      }
    } else {
      if (!isWithinViewport(
        scrollParent.scrollTop,
        scrollParent.offsetHeight,
        top,
        elem.offsetHeight,
      )) {
        scrollParent.scrollTop = top;
      }
    }
  }
}
