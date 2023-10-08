import { IResponseStatus, IServerError } from '@/models/IResponse';

export const isServerError = (response: unknown): response is IServerError =>
  !!response && typeof response === 'object' && 'status' in response && response.status === IResponseStatus.Error;
