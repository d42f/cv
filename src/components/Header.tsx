import React, { useEffect, useState } from 'react';

import { Logo } from './Logo';
import { Menu } from './Menu';

import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  const a = useState(1);

  useEffect(() => {
    console.log({ a });
  }, []);

  return (
    <header className={styles.wrapper}>
      <Logo />
      <Menu className={styles.menu} />
    </header>
  );
};
