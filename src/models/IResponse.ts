export enum IResponseStatus {
  Success = 'Ok',
  Error = 'Error',
}

interface IResponse {
  status: IResponseStatus;
}

export interface ISuccessResponse extends IResponse {
  status: IResponseStatus.Success;
}

export interface IErrorResponse extends IResponse {
  status: IResponseStatus.Error;
  message: string;
}
