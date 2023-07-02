import { useEffect, useState } from 'react';

export const useWasScrolled = (element: HTMLElement | Window | null, offset = 0): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = element
        ? 'scrollY' in element
          ? element.scrollY
          : 'scrollTop' in element
          ? element.scrollTop
          : null
        : null;
      setIsScrolled(typeof scroll === 'number' ? scroll > offset : false);
    };

    handleScroll();
    element?.addEventListener('scroll', handleScroll);
    return () => {
      element?.removeEventListener('scroll', handleScroll);
    };
  }, [element, offset]);

  return isScrolled;
};
