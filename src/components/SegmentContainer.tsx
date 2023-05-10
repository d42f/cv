import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './SegmentContainer.module.scss';

interface SegmentContainerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode;
}

export const SegmentContainer = forwardRef<HTMLDivElement, SegmentContainerProps>(function SegmentContainer(
  { className, children, ...rest },
  ref,
) {
  return (
    <div className={classNames(styles.wrapper, className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});
