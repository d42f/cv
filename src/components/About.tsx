import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { greeting, name, position, skills, summary } from '@/resume';

import styles from './About.module.scss';

const SKILLS = [
  { label: 'Frontend', description: skills.frontend.join(', ') },
  ...(skills.backend.length ? [{ label: 'Backend & APIs', description: skills.backend.join(', ') }] : []),
  ...(skills.tooling.length ? [{ label: 'Build & Tooling', description: skills.tooling.join(', ') }] : []),
  ...(skills.testing.length ? [{ label: 'Testing', description: skills.testing.join(', ') }] : []),
  ...(skills.methodologies.length ? [{ label: 'Methodologies', description: skills.methodologies.join(', ') }] : []),
];

interface AboutProps {
  className?: string;
}

export const About = ({ className }: AboutProps) => (
  <article className={classNames(styles.wrapper, className)}>
    <aside className={styles.photo}>
      <Image className={styles.image} src="/avatar.jpg" width={550} height={820} priority={true} alt="" />
    </aside>
    <main className={styles.info}>
      <header>
        <h2>{name}</h2>
        <h3>{position}</h3>
      </header>
      <p>
        {greeting} {summary}
      </p>
      <section className={styles.experience}>
        {SKILLS.map((skill, index) => (
          <Fragment key={index}>
            <strong>{skill.label}</strong>
            <span>{skill.description}</span>
          </Fragment>
        ))}
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
