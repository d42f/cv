import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { EMAIL_PATTERN } from '@/utils/email';
import styles from './MessageMeForm.module.scss';

export interface MessageMeData {
  name: string;
  email: string;
  message: string;
}

interface MessageMeFormProps {
  className?: string;
  disabled?: boolean;
  onSubmit: (data: MessageMeData) => void;
}

export const MessageMeForm = ({ className, disabled, onSubmit }: MessageMeFormProps): JSX.Element => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<MessageMeData>({
    mode: 'onChange',
  });

  return (
    <form
      className={classNames(styles.wrapper, className)}
      noValidate={true}
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      <fieldset className={styles.content} disabled={disabled}>
        <label className={styles.formField}>
          <span className={styles.formLabel}>Name</span>
          <input
            className={styles.formControl}
            {...register('name', { required: 'This field is required' })}
            type="text"
          />
          {errors.name && <span className={styles.formError}>{errors.name.message}</span>}
        </label>
        <label className={styles.formField}>
          <span className={styles.formLabel}>Email</span>
          <input
            className={styles.formControl}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'This field must be an email',
              },
            })}
            type="email"
          />
          {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
        </label>
        <label className={classNames(styles.formField, styles.wide)}>
          <span className={styles.formLabel}>Message</span>
          <textarea
            className={styles.formControl}
            {...register('message', { required: 'This field is required' })}
            rows={4}
          />
          {errors.message && <span className={styles.formError}>{errors.message.message}</span>}
        </label>
        <div className={styles.footer}>
          <button className={styles.submitBtn} type="submit">
            Send a message
          </button>
        </div>
      </fieldset>
    </form>
  );
};
