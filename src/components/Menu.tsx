import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './Menu.module.scss';

const ITEMS = [
  { path: '/', label: 'About' },
  { path: '/', label: 'Timeline' },
  { path: '/', label: 'Contacts' },
];

interface MenuProps {
  className?: string;
}

export const Menu = ({ className }: MenuProps) => (
  <nav className={classNames(styles.wrapper, className)}>
    <ul className={styles.list}>
      {ITEMS.map(({ path, label }, index) => (
        <li className={styles.item} key={index}>
          <Link className={styles.link} href={path}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
