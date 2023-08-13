import { useState } from 'react';
import { FaEnvelope, FaPhone, FaTelegramPlane } from 'react-icons/fa';
import classNames from 'classnames';
import useSWRMutation from 'swr/mutation';

import { email, phone, telegram } from '@/resume';
import { poster } from '@/utils/request';
import { linkEmail, linkPhone, linkTelegram } from '@/utils/link';
import { formatPhone } from '@/utils/phone';
import { sleep } from '@/utils/timeout';
import { MessageMeData, MessageMeForm } from '@/components/MessageMeForm';
import SuccessIcon from '@/components/SuccessIcon';
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
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { trigger } = useSWRMutation('/api/messages', poster<MessageMeData>);

  const handleFormSubmit = async (formData: MessageMeData) => {
    try {
      setIsFetching(true);
      await trigger(formData);
      setIsSuccess(true);
      await sleep(2000);
    } finally {
      setIsFetching(false);
      setIsSuccess(false);
      setFormKey(value => value + 1);
    }
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
          <a key={index} className={styles.infoBlock} href={href} aria-label={label}>
            <Icon className={styles.icon} />
            <p className={styles.label}>{label}</p>
          </a>
        ))}
      </div>
      <div className={styles.feedback}>
        <MessageMeForm
          className={classNames(styles.form, { [styles.formHidden]: isSuccess })}
          key={formKey}
          disabled={isFetching}
          onSubmit={handleFormSubmit}
        />
        {isSuccess && (
          <div className={styles.success}>
            <SuccessIcon width="240" height="240" />
          </div>
        )}
      </div>
    </div>
  );
};
