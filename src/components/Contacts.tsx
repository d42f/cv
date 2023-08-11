import classNames from 'classnames';
import { FaEnvelope, FaPhone, FaTelegramPlane } from 'react-icons/fa';
import useSWRMutation from 'swr/mutation';

import { email, phone, telegram } from '@/resume';
import { poster } from '@/utils/request';
import { linkEmail, linkPhone, linkTelegram } from '@/utils/link';
import { formatPhone } from '@/utils/phone';
import { MessageMeData, MessageMeForm } from './MessageMeForm';
import styles from './Contacts.module.scss';

const CONTACTS = [
  { label: email, href: linkEmail(email), Icon: FaEnvelope },
  ...(phone ? [{ label: formatPhone(phone), href: linkPhone(phone), Icon: FaPhone }] : []),
  ...(telegram ? [{ label: `@${telegram}`, href: linkTelegram(telegram), Icon: FaTelegramPlane }] : []),
];

interface ContactsProps {
  className?: string;
}

export const Contacts = ({ className }: ContactsProps): JSX.Element => {
  const { trigger, data } = useSWRMutation('/api/messages', poster<MessageMeData>);

  const handleFormSubmit = async (formData: MessageMeData) => {
    const result = await trigger(formData);
    console.log({ data, result });
  };

  return (
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
      <MessageMeForm onSubmit={handleFormSubmit} />
    </div>
  );
};
