import { Header } from '@/components/Header';

const MENU_ITEMS = [
  { href: '/', label: 'About' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/contacts', label: 'Contacts' },
];

export default function Index() {
  return (
    <>
      <Header logoHref={MENU_ITEMS[0].href} menuItems={MENU_ITEMS} />
    </>
  );
}
