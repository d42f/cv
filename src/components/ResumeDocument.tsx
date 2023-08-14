import React, { createRef, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaPrint } from 'react-icons/fa';

import {
  education,
  email,
  experience,
  interests,
  languages,
  links,
  methodologies,
  name,
  phone,
  skills,
  summary,
  telegram,
} from '@/resume';
import { formatDateRange } from '@/utils/date';
import { formatPhone } from '@/utils/phone';
import { linkEmail, linkPhone, linkTelegram } from '@/utils/link';
import styles from './ResumeDocument.module.scss';

interface IPoint {
  title: string;
  subtitle?: string;
  description?: string;
  achievements?: string[];
}

const DATE_MASK = 'yyyy-mm';

const CONTACTS = [
  { label: email, href: linkEmail(email) },
  ...(phone ? [{ label: `${formatPhone(phone)}`, href: linkPhone(phone) }] : []),
  ...(telegram ? [{ label: `telegram: @${telegram}`, href: linkTelegram(telegram) }] : []),
];

const LINKS = [
  { label: 'Github', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'Twitter', href: links.twitter },
  { label: 'CodeWars', href: links.codewars },
];

const EXPERIENCE_POINTS: IPoint[] = experience.map(
  ({ title, position, date_from, date_to, description, achievements }) => ({
    title: `${title ? `${title} - ` : ''}${position}`,
    ...(date_from || date_to ? { subtitle: formatDateRange(date_from, date_to, DATE_MASK) } : null),
    description,
    achievements,
  }),
);

const EDUCATION_POINTS: IPoint[] = education.map(({ title, place, date_from, date_to, description }) => ({
  title: `${place}${title ? ` - ${title}` : ''}`,
  ...(date_from || date_to ? { subtitle: formatDateRange(date_from, date_to, DATE_MASK) } : null),
  description,
}));

const Links = ({ items }: { items: Array<{ label: string; href: string }> }): JSX.Element => (
  <ul className={styles.contacts}>
    {items.map(({ label, href }, index) => (
      <li className={styles.contactsItem} key={index}>
        <a href={href} target="_blank">
          {label}
        </a>
      </li>
    ))}
  </ul>
);

const Point = ({ title, subtitle, children }: IPoint & { children: ReactNode }): JSX.Element => (
  <div className={styles.point}>
    <div className={styles.pointHeader}>
      <div className={styles.pointTitle}>{title}</div>
      {subtitle && <div className={styles.pointSubtitle}>{subtitle}</div>}
    </div>
    <div className={styles.pointContent}>{children}</div>
  </div>
);

const Section = ({
  label,
  points,
  children,
}: {
  label: string;
  points?: IPoint[];
  children?: ReactNode;
}): JSX.Element => (
  <section className={styles.section}>
    <span className={styles.sectionLabel}>{label}</span>
    <div className={styles.sectionContent}>
      {points?.map(({ title, subtitle, description, achievements }, index: number) => (
        <Point title={title} subtitle={subtitle} key={index}>
          {description && <p>{description}</p>}
          {achievements && (
            <ul>
              {achievements.map((achievement: string, index: number) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          )}
        </Point>
      ))}
      {!points && children}
    </div>
  </section>
);

interface ResumeDocumentProps {
  className?: string;
}

export const ResumeDocument = ({ className }: ResumeDocumentProps): JSX.Element => {
  const pageRef = createRef<HTMLDivElement>();
  const toolbarRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleWindowRerender = () => {
      const pageRect = pageRef.current?.getBoundingClientRect();
      if (pageRect && toolbarRef.current) {
        toolbarRef.current.style.right = `${pageRect.left}px`;
        toolbarRef.current.style.bottom = '0';
        if (window.innerHeight > pageRect.bottom) {
          toolbarRef.current.style.bottom = `${window.innerHeight - pageRect.bottom}px`;
        }
      }
    };

    handleWindowRerender();
    window.addEventListener('resize', handleWindowRerender);
    window.addEventListener('scroll', handleWindowRerender);
    return () => {
      window.removeEventListener('resize', handleWindowRerender);
      window.removeEventListener('scroll', handleWindowRerender);
    };
  });

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.page} ref={pageRef}>
        <section className={styles.header}>
          <div className={styles.description}>
            <h1 className={styles.name}>{name}</h1>
            <Links items={CONTACTS} />
            <Links items={LINKS} />
          </div>
          <Image className={styles.photo} src="/avatar_small.jpg" width={80} height={80} alt="" />
        </section>
        <hr className={styles.separator} />
        <Section label="Summary">
          <p>{summary}</p>
        </Section>
        {!!EXPERIENCE_POINTS.length && (
          <>
            <hr className={styles.separator} />
            <Section label="Experience" points={EXPERIENCE_POINTS} />
          </>
        )}
        {!!EDUCATION_POINTS.length && (
          <>
            <hr className={styles.separator} />
            <Section label="Education" points={EDUCATION_POINTS} />
          </>
        )}
        <hr className={styles.separator} />
        <Section label="Skills">
          <div className={styles.point}>
            <p>
              <strong>Technologies</strong>: {skills}
            </p>
            <p>
              <strong>Methodologies</strong>: {methodologies}
            </p>
          </div>
        </Section>
        <hr className={styles.separator} />
        <Section label="Languages">
          <p>{languages}</p>
        </Section>
        <Section label="Interests">
          <p>{interests}</p>
        </Section>
      </div>
      <footer className={styles.toolbar} ref={toolbarRef}>
        <Link className={styles.backBtn} href="/">
          <FaHome className={styles.icon} />
        </Link>
        <button className={styles.printBtn} type="button" onClick={() => window.print()}>
          <FaPrint />
        </button>
      </footer>
    </div>
  );
};
