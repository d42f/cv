import React from 'react';
import classNames from 'classnames';

import { Logo, LogoProps } from './Logo';
import { Menu, MenuProps } from './Menu';

import styles from './Header.module.scss';

interface HeaderProps {
  className?: string;
  logoHref: LogoProps['href'];
  menuItems: MenuProps['items'];
}

export const Header = ({ className, logoHref, menuItems }: HeaderProps): JSX.Element => (
  <header className={classNames(styles.wrapper, className)}>
    <Logo href={logoHref} />
    <Menu className={styles.menu} items={menuItems} />
  </header>
);
