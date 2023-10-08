import { IErrorResponse, IResponseStatus } from '@/models/IResponse';

export const isServerError = (response: unknown): response is IErrorResponse =>
  !!response && typeof response === 'object' && 'status' in response && response.status === IResponseStatus.Error;
