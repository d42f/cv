import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Segment.module.scss';

export interface SegmentProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode;
}

export const Segment = forwardRef<HTMLDivElement, SegmentProps>(function Segment({ className, ...rest }, ref) {
  return <div className={classNames(styles.wrapper, className)} ref={ref} {...rest} />;
});
