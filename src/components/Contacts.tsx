import classNames from 'classnames';
import { FaEnvelope, FaPhone, FaTelegramPlane } from 'react-icons/fa';

import { email, phone, telegram } from '@/resume';
import { linkEmail, linkPhone, linkTelegram } from '@/utils/link';
import { formatPhone } from '@/utils/phone';
import styles from './Contacts.module.scss';

const CONTACTS = [
  { label: email, href: linkEmail(email), Icon: FaEnvelope },
  ...(phone ? [{ label: formatPhone(phone), href: linkPhone(phone), Icon: FaPhone }] : []),
  ...(telegram ? [{ label: `@${telegram}`, href: linkTelegram(telegram), Icon: FaTelegramPlane }] : []),
];

interface ContactsProps {
  className?: string;
}

export const Contacts = ({ className }: ContactsProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <p className={styles.description}>
      Want to say hello? Want to know more about me?
      <br />
      Drop me an email and I will get back to you as soon as I can.
    </p>
    <div className={styles.info}>
      {CONTACTS.map(({ label, href, Icon }, index) => (
        <a key={index} className={styles.block} href={href} aria-label={label}>
          <Icon className={styles.icon} />
          <p className={styles.label}>{label}</p>
        </a>
      ))}
    </div>
  </div>
);
