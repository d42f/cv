import React, { useEffect, useRef, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import classNames from 'classnames';

import { experience } from '@/resume';
import { formatDate } from '@/utils/date';
import styles from './Timeline.module.scss';

const DATE_MASK = 'mm yyyy';

const BLOCKS = experience.map(({ title, position, date_from, date_to, description }) => ({
  title: title || position,
  subtitle: title ? position : null,
  date: `${formatDate(date_from, DATE_MASK)} to ${date_to ? formatDate(date_to, DATE_MASK) : 'Present'}`,
  description,
}));

interface TimelineProps {
  className?: string;
}

export const Timeline = ({ className }: TimelineProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionStates, setSectionStates] = useState(() =>
    Object.fromEntries(BLOCKS.map((_, index) => [index, false])),
  );

  useEffect(() => {
    let scrolling = false;

    const checkSections = () => {
      scrolling = false;
      BLOCKS.forEach((_, index) => {
        if (!sectionStates[index]) {
          const section = containerRef.current?.children[index];
          if (section && section.getBoundingClientRect().top <= window.innerHeight) {
            setSectionStates(value => ({ ...value, [index]: true }));
          }
        }
      });
    };

    const debouncedHandler = () => {
      if (!scrolling) {
        scrolling = true;
        if (!window.requestAnimationFrame) {
          setTimeout(checkSections, 250);
        } else {
          window.requestAnimationFrame(checkSections);
        }
      }
    };

    checkSections();
    window.addEventListener('scroll', debouncedHandler);
    return () => {
      window.removeEventListener('scroll', debouncedHandler);
    };
  }, [sectionStates]);

  return (
    <article className={classNames(styles.wrapper, className)}>
      <div className={styles.edgePoint}>PRESENT</div>

      <div className={styles.container} ref={containerRef}>
        {BLOCKS.map(({ title, subtitle, date, description }, index) => (
          <section className={classNames(styles.block, { [styles.blockVisible]: sectionStates[index] })} key={index}>
            <div className={styles.blockPoint} />
            <div className={styles.blockContent}>
              <h4>{title}</h4>
              <h5>{subtitle}</h5>
              <time>{date}</time>
              <p>{description}</p>
            </div>
          </section>
        ))}
      </div>

      <div className={styles.edgePoint}>
        <FaBookmark />
      </div>
    </article>
  );
};
