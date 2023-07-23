import classNames from 'classnames';

import { IPage } from '@/models/IPage';
import { useWasScrolled } from '@/hooks/useWasScrolled';
import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string;
  logoHref: string;
  pages: IPage[];
  activePage?: IPage;
  onSelect?: (page: IPage) => void;
}

export const Header = ({ className, logoHref, pages, activePage, onSelect }: HeaderProps): JSX.Element => {
  const isScrolled = useWasScrolled();

  return (
    <header className={classNames(styles.wrapper, className, { [styles.wrapperSticked]: isScrolled })}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo href={logoHref} />
          <Menu className={styles.menu} items={pages} active={activePage} onSelect={onSelect} />
        </div>
      </div>
    </header>
  );
};
