import React, { ComponentType, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import { IPage } from '@/models/IPage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SegmentContainer } from '@/components/SegmentContainer';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { About } from '@/components/About';
import { Segment } from '@/components/Segment';

interface ISegment {
  key: string;
  page: IPage;
  Component: ComponentType;
}

const SEGMENTS: ISegment[] = [
  {
    key: 'about',
    page: { href: '/', label: 'About' },
    Component: About,
  },
  {
    key: 'timeline',
    page: { href: '/timeline', label: 'Timeline' },
    Component: Timeline,
  },
];

const getActiveSegmentByKey = (segments: ISegment[], key: string | null): ISegment | undefined =>
  segments.find(segment => segment.key === key);

export default function Index() {
  const { asPath, push } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTarget = useIntersectionObserver({ container: containerRef.current });
  const activeSegment = getActiveSegmentByKey(SEGMENTS, activeTarget?.getAttribute('data-key') || null);

  const pages = useMemo(() => SEGMENTS.map(({ page }) => page), []);
  const activePage = useMemo(() => pages.find(page => page.href === asPath) || null, [pages, asPath]);

  useEffect(() => {
    if (activeSegment && activePage && activeSegment.page !== activePage) {
      push(activeSegment.page.href, undefined, { scroll: false, shallow: false });
    }
  }, [activeSegment, activePage, push]);

  return (
    <>
      <Header logoHref={pages[0].href} menuItems={pages} activeItem={activePage} />
      <SegmentContainer ref={containerRef}>
        <>
          {SEGMENTS.map(({ key, Component }) => (
            <Segment key={key} data-key={key}>
              <Component />
            </Segment>
          ))}
        </>
      </SegmentContainer>
    </>
  );
}
