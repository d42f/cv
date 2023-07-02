import Link from 'next/link';
import classNames from 'classnames';

import { IPage } from '@/models/IPage';

import styles from './Menu.module.scss';

interface MenuProps {
  className?: string;
  items: IPage[];
  active: IPage | null;
}

export const Menu = ({ className, items, active }: MenuProps): JSX.Element => (
  <nav className={classNames(styles.wrapper, className)}>
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li className={styles.item} key={index}>
          <Link className={classNames(styles.link, { [styles.linkActive]: item === active })} href={item.href}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
