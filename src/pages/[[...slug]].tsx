import React, { ComponentType, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Router from 'next/router';

import { IPage } from '@/models/IPage';
import { SegmentContainer } from '@/components/SegmentContainer';
import { Segment } from '@/components/Segment';
import { PageHeader } from '@/components/PageHeader';
import { Timeline } from '@/components/Timeline';
import { About } from '@/components/About';
import { Contacts } from '@/components/Contacts';
import { PageFooter } from '@/components/PageFooter';
import { useAnchorObserver } from '@/hooks/useAnchorObserver';

interface ISegment {
  page: IPage;
  Component: ComponentType;
}

const SEGMENTS: ISegment[] = [
  {
    page: { href: '/', label: 'About' },
    Component: About,
  },
  {
    page: { href: '/timeline', label: 'Timeline' },
    Component: Timeline,
  },
  {
    page: { href: '/contacts', label: 'Contacts' },
    Component: Contacts,
  },
];

const PAGES = SEGMENTS.map(({ page }) => page);

const ANCHORS = SEGMENTS.map(segment => segment.page.href);

export default function Index() {
  const pathName = usePathname();

  const changeRouter = useCallback((anchor: string) => {
    Router.push(anchor, undefined, { scroll: false, shallow: false });
  }, []);

  const { ref: containerRef } = useAnchorObserver<HTMLDivElement>({
    anchors: ANCHORS,
    currentAnchor: pathName,
    onAnchorChange: changeRouter,
  });

  const activePage = useMemo(() => PAGES.find(page => page.href === pathName), [pathName]);

  return (
    <>
      <PageHeader logoHref={PAGES[0].href} pages={PAGES} activePage={activePage} />
      <SegmentContainer ref={containerRef}>
        {SEGMENTS.map(({ page, Component }) => (
          <Segment key={page.href}>
            <Component />
          </Segment>
        ))}
      </SegmentContainer>
      <PageFooter />
    </>
  );
}
