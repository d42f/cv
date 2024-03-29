import React, { ComponentType, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Router from 'next/router';
import { useAnchorObserver } from 'react-use-observer-hooks';

import { IPage } from '@/models/IPage';
import { SegmentContainer } from '@/components/SegmentContainer';
import { Segment } from '@/components/Segment';
import { PageHeader } from '@/components/PageHeader';
import { Timeline } from '@/components/Timeline';
import { About } from '@/components/About';
import { Contacts } from '@/components/Contacts';
import { PageFooter } from '@/components/PageFooter';

const SEGMENTS: Array<{ page: IPage; Component: ComponentType }> = [
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

export default function Page() {
  const pathName = usePathname();

  const changeRouter = useCallback((anchor: string) => {
    Router.push(anchor, undefined, { scroll: false, shallow: false });
  }, []);

  const { ref: containerRef, focusedAnchor } = useAnchorObserver<HTMLDivElement>({
    anchors: ANCHORS,
    currentAnchor: pathName,
    onAnchorChange: changeRouter,
  });

  const currentPage = useMemo(() => PAGES.find(page => page.href === focusedAnchor), [focusedAnchor]);

  return (
    <>
      <PageHeader logoHref={PAGES[0].href} pages={PAGES} currentPage={currentPage} />
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
