import { useEffect } from 'react';

export default function useElementInView(
  element: string,
  cb: (el: Element, inView: boolean) => void
) {
  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  function onScroll() {
    const el = document.querySelector(element);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const { clientHeight, clientWidth } = document.documentElement;
    
    const totalHeight = window.innerHeight || clientHeight;
    const totalWidth = window.innerWidth || clientWidth;

    const inView =
      rect.top + rect.height >= 0 &&
      rect.left >= 0 &&
      (rect.bottom <= totalHeight ||
      rect.bottom - rect.height <= totalHeight) &&
      rect.right <= totalWidth;

    cb(el, inView);
  }
}
