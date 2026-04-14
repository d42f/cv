import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { FaHome, FaPrint } from 'react-icons/fa';
import Link from 'next/link';
import classNames from 'classnames';

import { education, email, experience, languages, links, name, position, skills, summary } from '@/resume';
import { formatDateRange } from '@/utils/date';
import { linkEmail } from '@/utils/link';

import styles from './ResumeDocument.module.scss';

interface IPoint {
  title: string;
  subtitle?: string;
  description?: string;
  achievements?: string[];
}

const DATE_MASK = 'mm/yyyy';

const CONTACTS = [
  { label: email, href: linkEmail(email) },
  //...(phone ? [{ label: `${formatPhone(phone)}`, href: linkPhone(phone) }] : []),
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'Github', href: links.github },
  { label: 'Twitter', href: links.twitter },
  { label: 'CodeWars', href: links.codewars },
  //...(telegram ? [{ label: `telegram: @${telegram}`, href: linkTelegram(telegram) }] : []),
].filter(link => link.href);

const SKILLS = [
  { label: 'Frontend', description: skills.frontend.join(', ') },
  ...(skills.backend.length ? [{ label: 'Backend & APIs', description: skills.backend.join(', ') }] : []),
  ...(skills.tooling.length ? [{ label: 'Build & Tooling', description: skills.tooling.join(', ') }] : []),
  ...(skills.testing.length ? [{ label: 'Testing', description: skills.testing.join(', ') }] : []),
  ...(skills.methodologies.length ? [{ label: 'Methodologies', description: skills.methodologies.join(', ') }] : []),
];

const EXPERIENCE_POINTS: IPoint[] = experience.map(
  ({ title, position, date_from, date_to, description, achievements }) => ({
    title: `${title ? `${title} - ` : ''}${position}`,
    ...(date_from || date_to ? { subtitle: formatDateRange(date_from, date_to, DATE_MASK) } : null),
    description,
    achievements,
  }),
);

const EDUCATION_POINTS: IPoint[] = education.map(({ title, date_from, date_to, description }) => ({
  title,
  ...(date_from || date_to ? { subtitle: formatDateRange(date_from, date_to, DATE_MASK) } : null),
  description,
}));

const Links = ({ className, items }: { className?: string; items: Array<{ label: string; href: string }> }) => (
  <ul className={classNames(styles.contacts, className)}>
    {items.map(({ label, href }, index) => (
      <li className={styles.contactsItem} key={index}>
        <a href={href} target="_blank">
          {href.startsWith('mailto:') || href.startsWith('tg:') ? label.replace(/^(mailto|tel):/, '') : href}
        </a>
      </li>
    ))}
  </ul>
);

const Point = ({ title, subtitle, children }: IPoint & { children: ReactNode }) => (
  <div className={styles.point}>
    <div className={styles.pointHeader}>
      <div className={styles.pointTitle}>{title}</div>
      {subtitle && <div className={styles.pointSubtitle}>{subtitle}</div>}
    </div>
    <div className={styles.pointContent}>{children}</div>
  </div>
);

const Section = ({ label, points, children }: { label: string; points?: IPoint[]; children?: ReactNode }) => (
  <section className={styles.section}>
    <span className={styles.sectionLabel}>{label}</span>
    <div className={styles.sectionContent}>
      {points?.map(({ title, subtitle, description, achievements }, index: number) => (
        <Point title={title} subtitle={subtitle} key={index}>
          {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
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

export const ResumeDocument = ({ className }: ResumeDocumentProps) => {
  const [toolbarStyles, setToolbarStyles] = useState<Partial<CSSProperties>>();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWindowRerender = () => {
      const pageRect = pageRef.current?.getBoundingClientRect();
      if (pageRect) {
        setToolbarStyles({
          right: `${pageRect.left}px`,
          bottom: window.innerHeight > pageRect.bottom ? `${window.innerHeight - pageRect.bottom}px` : 0,
        });
      }
    };

    handleWindowRerender();
    window.addEventListener('resize', handleWindowRerender);
    window.addEventListener('scroll', handleWindowRerender);

    return () => {
      window.removeEventListener('resize', handleWindowRerender);
      window.removeEventListener('scroll', handleWindowRerender);
    };
  }, []);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.page} ref={pageRef}>
        <section className={styles.header}>
          <div className={styles.description}>
            <h1 className={styles.name}>{name}</h1>
            <h2 className={styles.position}>{position}</h2>
            <Links items={CONTACTS} />
          </div>
        </section>
        <Section label="Summary">
          <div>
            {summary.map((str, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: str }} />
            ))}
          </div>
        </Section>
        <Section label="Skills">
          <div className={styles.point}>
            {SKILLS.map((skill, index) => (
              <p key={index}>
                <strong>{skill.label}</strong>: {skill.description}
              </p>
            ))}
          </div>
        </Section>
        {!!EXPERIENCE_POINTS.length && <Section label="Experience" points={EXPERIENCE_POINTS} />}
        <div className={styles.printHelper}>
          {!!EDUCATION_POINTS.length && <Section label="Education" points={EDUCATION_POINTS} />}
        </div>
        <Section label="Languages">
          <p>{languages}</p>
        </Section>
      </div>
      <footer className={classNames(styles.toolbar, toolbarStyles && styles.toolbarVisible)} style={toolbarStyles}>
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
