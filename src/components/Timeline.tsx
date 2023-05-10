import React from 'react';
import classNames from 'classnames';

import styles from './Timeline.module.scss';

interface TimelineProps {
  className?: string;
}

export const Timeline = ({ className }: TimelineProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>Timeline</div>
);
