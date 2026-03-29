import React, { ComponentType, useMemo } from 'react';
import { useAnchorObserver } from 'react-use-observer-hooks';
import { usePathname } from 'next/navigation';
import Router from 'next/router';

import { About } from '@/components/About';
import { Contacts } from '@/components/Contacts';
import { PageFooter } from '@/components/PageFooter';
import { PageHeader } from '@/components/PageHeader';
import { Segment } from '@/components/Segment';
import { SegmentContainer } from '@/components/SegmentContainer';
import { Timeline } from '@/components/Timeline';
import { IPage } from '@/models/IPage';

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

  const { ref: containerRef, focusedAnchor } = useAnchorObserver<HTMLDivElement>({
    anchors: ANCHORS,
    currentAnchor: pathName,
    onAnchorChange: (anchor: string) => {
      Router.push(anchor, undefined, { scroll: false, shallow: false });
    },
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
