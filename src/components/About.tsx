import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import resume from '../resume.yaml';
import styles from './About.module.scss';

const { name, position, summary, skills, methodologies } = resume;

interface AboutProps {
  className?: string;
}

export const About = ({ className }: AboutProps): JSX.Element => (
  <article className={classNames(styles.wrapper, className)}>
    <aside className={styles.photo}>
      <Image className={styles.image} src="/avatar.jpg" width={550} height={820} alt="" />
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
        <Link className={`${styles.navBtn} ${styles.navBtnPrimary}`} href="/resume">
          My Resume
        </Link>
        <Link className={`${styles.navBtn} ${styles.navBtnLight}`} href="/contacts">
          My contacts
        </Link>
      </footer>
    </main>
  </article>
);
