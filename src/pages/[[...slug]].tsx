import React, { ComponentType, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Router from 'next/router';

import { IPage } from '@/models/IPage';
import { useVisibleChildren } from '@/hooks/useIntersectionObserver';
import { SegmentContainer } from '@/components/SegmentContainer';
import { Segment } from '@/components/Segment';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { About } from '@/components/About';
import { Contacts } from '@/components/Contacts';
import { PageFooter } from '@/components/PageFooter';

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
  {
    key: 'contacts',
    page: { href: '/contacts', label: 'Contacts' },
    Component: Contacts,
  },
];

const getActiveSegmentByKey = (segments: ISegment[], key: string | null | undefined): ISegment | undefined =>
  segments.find(segment => segment.key === key);

const getChildBySegment = (element: Element, segment: ISegment): Element | undefined =>
  Array.from(element.children).find(element => element.getAttribute('data-key') === segment.key);

export default function Index() {
  const pathName = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const focusedTarget = useVisibleChildren(containerRef.current);
  const focusedSegment = getActiveSegmentByKey(SEGMENTS, focusedTarget?.getAttribute('data-key'));

  const pages = useMemo(() => SEGMENTS.map(({ page }) => page), []);
  const activePage = useMemo(() => pages.find(page => page.href === pathName), [pages, pathName]);

  const handlePageSelect = (page: IPage) => {
    const { current } = containerRef;
    const segment = SEGMENTS.find(segment => segment.page === page);
    const child = current && segment ? getChildBySegment(current, segment) : null;
    if (child) {
      isScrollingRef.current = true;
      child.scrollIntoView({ behavior: 'smooth' });
      // TODO: make it better
      setTimeout(() => (isScrollingRef.current = false), 300);
    }
  };

  useEffect(() => {
    if (focusedSegment?.page && !isScrollingRef.current) {
      Router.push(focusedSegment.page.href, undefined, { scroll: false, shallow: false });
    }
  }, [focusedSegment]);

  return (
    <>
      <Header logoHref={pages[0].href} pages={pages} activePage={activePage} onSelect={handlePageSelect} />
      <SegmentContainer ref={containerRef}>
        <>
          {SEGMENTS.map(({ key, Component }) => (
            <Segment key={key} data-key={key}>
              <Component />
            </Segment>
          ))}
        </>
      </SegmentContainer>
      <PageFooter />
    </>
  );
}
