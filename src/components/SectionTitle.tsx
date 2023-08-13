import classNames from 'classnames';

import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  className?: string;
  label: string;
}

export const SectionTitle = ({ className, label }: SectionTitleProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <h3 className={styles.title}>{label}</h3>
    <span className={styles.letter}>{label.charAt(0)}</span>
  </div>
);
