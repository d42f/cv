import { useWasScrolled } from 'react-use-observer-hooks';
import classNames from 'classnames';

import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';
import { IPage } from '@/models/IPage';

import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  className?: string;
  logoHref: string;
  pages: IPage[];
  currentPage?: IPage;
  onSelect?: (page: IPage) => void;
}

export const PageHeader = ({ className, logoHref, pages, currentPage, onSelect }: PageHeaderProps) => {
  const isScrolled = useWasScrolled();

  return (
    <header className={classNames(styles.wrapper, className, { [styles.wrapperSticked]: isScrolled })}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo className={styles.logo} href={logoHref} />
          <Menu className={styles.menu} items={pages} active={currentPage} onSelect={onSelect} />
        </div>
      </div>
    </header>
  );
};
