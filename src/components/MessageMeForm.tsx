import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import styles from './MessageMeForm.module.scss';

export interface MessageMeData {
  name: string;
  email: string;
  message: string;
}

interface MessageMeFormProps {
  className?: string;
  onSubmit: (data: MessageMeData) => void;
}

export const MessageMeForm = ({ className, onSubmit }: MessageMeFormProps): JSX.Element => {
  const { register, handleSubmit } = useForm<MessageMeData>({
    mode: 'onChange',
  });

  return (
    <form className={classNames(styles.wrapper, className)} onSubmit={handleSubmit(data => onSubmit(data))}>
      <label className={styles.formField}>
        <span className={styles.formLabel}>Name</span>
        <input className={styles.formControl} {...register('name')} type="text" />
      </label>
      <label className={styles.formField}>
        <span className={styles.formLabel}>Email</span>
        <input
          className={styles.formControl}
          {...register('email', { required: 'This field is required' })}
          type="email"
        />
      </label>
      <label className={classNames(styles.formField, styles.wide)}>
        <span className={styles.formLabel}>Message</span>
        <textarea className={styles.formControl} {...register('message', { required: 'This field is required' })} />
      </label>
      <div className={styles.footer}>
        <button className={styles.submitBtn} type="submit">
          Send a message
        </button>
      </div>
    </form>
  );
};
