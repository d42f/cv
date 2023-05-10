import { useEffect, useRef, useState } from 'react';

const PARAMS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0%',
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

interface useIntersectionObserverProps {
  container: Element | null;
}

export const useIntersectionObserver = ({ container }: useIntersectionObserverProps) => {
  const [activeTarget, setActiveTarget] = useState<Element | null>(null);
  const activeEntryRef = useRef<IntersectionObserverEntry>();

  useEffect(() => {
    const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
      const { intersectionRatio, target } = entry;
      const { current: activeEntry } = activeEntryRef;
      if (!activeEntry || target === activeEntry.target || intersectionRatio >= activeEntry.intersectionRatio) {
        activeEntryRef.current = entry;
      }
      setActiveTarget(activeEntryRef.current?.target || null);
    };

    if (container) {
      const observers = Array.from(container.children).map(target => {
        if (target && window.IntersectionObserver) {
          const observer = new IntersectionObserver(updateEntry, PARAMS);
          observer.observe(target);
          return observer;
        }
      });

      return () => observers.forEach(observer => observer?.disconnect());
    }
  }, [container]);

  return activeTarget;
};
