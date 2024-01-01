import Link from 'next/link';
import classNames from 'classnames';

import styles from './Menu.module.scss';

interface MenuProps<T> {
  className?: string;
  items: T[];
  active?: T | null;
  onSelect?: (item: T) => void;
}

export const Menu = <T extends { href: string; label: string }>({
  className,
  items,
  active,
  onSelect,
}: MenuProps<T>): JSX.Element => {
  return (
    <nav className={classNames(styles.wrapper, className)}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            <Link
              className={classNames(styles.link, { [styles.linkActive]: item === active })}
              href={item.href}
              scroll={false}
              shallow={true}
              onClick={() => onSelect?.(item)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
