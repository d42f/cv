import { IResendError } from '@/models/IResend';

export const isResendError = (response: unknown): response is IResendError =>
  !!response && typeof response === 'object' && 'statusCode' in response && (response.statusCode as number) > 299;
