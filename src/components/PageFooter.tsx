import classNames from 'classnames';
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

import { links } from '@/resume';
import styles from './PageFooter.module.scss';

const footerLinks = [
  { label: 'Github', Icon: FaGithub, href: links.github },
  { label: 'Twitter', Icon: FaTwitter, href: links.twitter },
  { label: 'Instagram', Icon: FaInstagram, href: links.instagram },
  { label: 'Facebook', Icon: FaFacebookF, href: links.facebook },
];

interface PageFooterProps {
  className?: string;
}

export const PageFooter = ({ className }: PageFooterProps): JSX.Element => (
  <footer className={classNames(styles.wrapper, className)}>
    <nav className={styles.nav}>
      {footerLinks.map(({ label, href, Icon }, ind) => (
        <a key={ind} className={styles.link} href={href} title={label} aria-label={label}>
          <Icon />
        </a>
      ))}
    </nav>
    <p className={styles.copyrights}>
      <a href="https://github.com/d42f/cv" target="_blank" rel="noreferrer noopener">
        © {new Date().getFullYear()} All Rights Reserved
      </a>
    </p>
  </footer>
);
