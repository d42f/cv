/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaPrint } from 'react-icons/fa';

import { formatDate } from '../utils/date';
import { formatPhone } from '../utils/phone';
import { linkEmail, linkPhone, linkTelegram } from '../utils/link';
import resume from '../resume.yaml';
import styles from './ResumeDocument.module.scss';

const DATE_MASK = 'yyyy-MM';

const contacts = [
  { label: resume.email, href: linkEmail(resume.email) },
  ...(resume.phone ? [{ label: `${formatPhone(resume.phone)}`, href: linkPhone(resume.phone) }] : []),
  ...(resume.telegram ? [{ label: `telegram: @${resume.telegram}`, href: linkTelegram(resume.telegram) }] : []),
];

const links = [
  { label: 'Github', href: resume.links.github },
  { label: 'LinkedIn', href: resume.links.linkedin },
  { label: 'Twitter', href: resume.links.twitter },
  { label: 'CodeWars', href: resume.links.codewars },
];

const experiencePoints = (resume.experience || []).map(
  ({ position, company, date_from, date_to, description, achievements }: any) => ({
    title: `${company ? `${company} - ` : ''}${position}`,
    subtitle:
      date_from || date_to
        ? `${formatDate(date_from, DATE_MASK)} — ${date_to ? formatDate(date_to, DATE_MASK) : 'Present'}`
        : null,
    description,
    achievements,
  }),
);

const educationPoints = (resume.education || []).map(({ title, place, date_from, date_to, description }: any) => ({
  title: `${place}${title ? ` - ${title}` : ''}`,
  subtitle:
    date_from || date_to
      ? `${formatDate(date_from, DATE_MASK)} — ${date_to ? formatDate(date_to, DATE_MASK) : 'Present'}`
      : null,
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

const Point = ({ title, subtitle, children }: any): JSX.Element => (
  <div className={styles.point}>
    <div className={styles.pointHeader}>
      <div className={styles.pointTitle}>{title}</div>
      {subtitle && <div className={styles.pointSubtitle}>{subtitle}</div>}
    </div>
    <div className={styles.pointContent}>{children}</div>
  </div>
);

const Section = ({ label, points, children }: any): JSX.Element => (
  <section className={styles.section}>
    <span className={styles.sectionLabel}>{label}</span>
    <div className={styles.sectionContent}>
      {points?.map(({ title, subtitle, description, achievements }: any, index: number) => (
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
    function handleWindowRerender() {
      const pageRect = pageRef.current?.getBoundingClientRect();
      if (pageRect && toolbarRef.current) {
        toolbarRef.current.style.right = `${pageRect.left}px`;
        toolbarRef.current.style.bottom = '0';
        if (window.innerHeight > pageRect.bottom) {
          toolbarRef.current.style.bottom = `${window.innerHeight - pageRect.bottom}px`;
        }
      }
    }

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
            <h1 className={styles.name}>{resume.name}</h1>
            <Links items={contacts} />
            <Links items={links} />
          </div>
          <div className={styles.photo}>
            <Image className={styles.image} src="/avatar_small.jpg" width={80} height={80} alt="" />
          </div>
        </section>
        <hr className={styles.separator} />
        <Section label="Summary">
          <p>{resume.summary}</p>
        </Section>
        {!!experiencePoints.length && (
          <>
            <hr className={styles.separator} />
            <Section label="Experience" points={experiencePoints} />
          </>
        )}
        {!!educationPoints.length && (
          <>
            <hr className={styles.separator} />
            <Section label="Education" points={educationPoints} />
          </>
        )}
        <hr className={styles.separator} />
        <Section label="Skills">
          <p>
            <strong>Technologies</strong>: {resume.skills}
          </p>
          <p>
            <strong>Methodologies</strong>: {resume.methodologies}
          </p>
        </Section>
        <hr className={styles.separator} />
        <Section label="Languages">
          <p>{resume.languages}</p>
        </Section>
        <Section label="Interests">
          <p>{resume.interests}</p>
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
