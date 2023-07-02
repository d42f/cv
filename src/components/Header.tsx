import classNames from 'classnames';

import { IPage } from '@/models/IPage';

import { Logo } from './Logo';
import { Menu } from './Menu';

import styles from './Header.module.scss';
import { useWasScrolled } from '@/hooks/useWasScrolled';

interface HeaderProps {
  className?: string;
  logoHref: string;
  menuItems: IPage[];
  activeItem: IPage | null;
}

export const Header = ({ className, logoHref, menuItems, activeItem }: HeaderProps): JSX.Element => {
  const isScrolled = useWasScrolled(typeof window === 'object' ? window : null);

  return (
    <header className={classNames(styles.wrapper, className, { [styles.wrapperSticked]: isScrolled })}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo href={logoHref} />
          <Menu className={styles.menu} items={menuItems} active={activeItem} />
        </div>
      </div>
    </header>
  );
};
