export function elementInView(el: Element) {
  const { top, left, bottom, right, height } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;

  const inView =
    top + height / 2 >= 0 &&
    left >= 0 &&
    bottom <= innerHeight + height / 3 &&
    right <= innerWidth;

  return inView;
}

export function inViewAddClass(elements: Element[], className: string) {
  for (const element of elements) {
      const containsClassName = element.classList.contains(className)

      if (elementInView(element)) {
          !containsClassName ? element.classList.add(className) : null
      } else if (containsClassName) {
          element.classList.remove(className)
      }
  }
}