import Link from 'next/link';
import classNames from 'classnames';

import { name } from '@/resume';

import styles from './Logo.module.scss';

export interface LogoProps extends Pick<Parameters<typeof Link>[0], 'href'> {
  className?: string;
}

export const Logo = ({ className, ...rest }: LogoProps) => (
  <h1 className={classNames(styles.label, className)}>
    <Link className={styles.link} {...rest}>
      {name}&apos;S CV
    </Link>
  </h1>
);
