import React, { useRef } from 'react';
import classNames from 'classnames';
import { FaBookmark } from 'react-icons/fa';
import { useVisible } from 'react-use-observer-hooks';

import { experience } from '@/resume';
import { formatDateRange } from '@/utils/date';
import { SectionTitle } from '@/components/SectionTitle';
import styles from './Timeline.module.scss';

interface IBlock {
  title: string;
  subtitle?: string | null;
  date: string;
  description: string;
}

const DATE_MASK = 'mm yyyy';

const BLOCKS: IBlock[] = experience.map(({ title, position, date_from, date_to, description }) => ({
  title: title || position,
  subtitle: title ? position : null,
  date: formatDateRange(date_from, date_to, DATE_MASK),
  description,
}));

interface TimelineProps {
  className?: string;
}

const Block = ({ title, subtitle, date, description }: IBlock): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisible(ref.current, { freezeOnceVisible: true });

  return (
    <section className={classNames(styles.block, { [styles.blockVisible]: visible })} ref={ref}>
      <div className={styles.blockPoint} />
      <div className={styles.blockContent}>
        <h4>{title}</h4>
        <h5>{subtitle}</h5>
        <time>{date}</time>
        <p>{description}</p>
      </div>
    </section>
  );
};

export const Timeline = ({ className }: TimelineProps): JSX.Element => (
  <article className={classNames(styles.wrapper, className)}>
    <SectionTitle label="Timeline" />
    <div className={classNames(styles.edgePoint, styles.startPoint)}>PRESENT</div>
    <div className={styles.container}>
      {BLOCKS.map((block, index) => (
        <Block key={index} {...block} />
      ))}
    </div>
    <div className={classNames(styles.edgePoint, styles.edgePointEnd)}>
      <FaBookmark />
    </div>
  </article>
);
