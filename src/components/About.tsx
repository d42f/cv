import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { methodologies, name, position, skills, summary } from '@/resume';
import styles from './About.module.scss';

interface AboutProps {
  className?: string;
}

export const About = ({ className }: AboutProps): JSX.Element => (
  <article className={classNames(styles.wrapper, className)}>
    <aside className={styles.photo}>
      <Image className={styles.image} src="/avatar.jpg" width={550} height={820} priority={true} alt="" />
    </aside>
    <main className={styles.info}>
      <header>
        <h2>{name}</h2>
        <h3>{position}</h3>
      </header>
      <p>{summary}</p>
      <section className={styles.experience}>
        <strong>Skills:</strong>
        <span>{skills}</span>
        <strong>Workflow:</strong>
        <span>{methodologies}</span>
      </section>
      <footer className={styles.nav}>
        <Link className={styles.navBtnPrimary} href="/cv">
          My CV
        </Link>
        <Link className={styles.navBtnLight} href="/contacts">
          My contacts
        </Link>
      </footer>
    </main>
  </article>
);
