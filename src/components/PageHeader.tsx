import classNames from 'classnames';

import { IPage } from '@/models/IPage';
import { useWasScrolled } from '@/hooks/useWasScrolled';
import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  className?: string;
  logoHref: string;
  pages: IPage[];
  currentPage?: IPage;
  onSelect?: (page: IPage) => void;
}

export const PageHeader = ({ className, logoHref, pages, currentPage, onSelect }: PageHeaderProps): JSX.Element => {
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
