import React from 'react';
import classNames from 'classnames';

import styles from './About.module.scss';

interface AboutProps {
  className?: string;
}

export const About = ({ className }: AboutProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>About</div>
);
