import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './Menu.module.scss';
import { useRouter } from 'next/router';

interface MenuItem {
  href: string;
  label: string;
}

export interface MenuProps {
  className?: string;
  items: MenuItem[];
}

export const Menu = ({ className, items }: MenuProps): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <nav className={classNames(styles.wrapper, className)}>
      <ul className={styles.list}>
        {items.map(({ href, label }, index) => (
          <li className={styles.item} key={index}>
            <Link className={classNames(styles.link, { [styles.linkActive]: asPath === href })} href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
