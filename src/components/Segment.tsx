import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Segment.module.scss';

export interface SegmentProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode;
}

export const Segment = forwardRef<HTMLDivElement, SegmentProps>(function Segment(
  { className, ...rest },
  ref,
): JSX.Element {
  return <div className={classNames(styles.wrapper, className)} ref={ref} {...rest} />;
});
