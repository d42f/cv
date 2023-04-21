import React from 'react';

import { Logo } from './Logo';
import { Menu } from './Menu';

import styles from './Header.module.scss';

export const Header = (): JSX.Element => (
  <header className={styles.wrapper}>
    <Logo />
    <Menu className={styles.menu} />
  </header>
);
