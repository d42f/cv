import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

import { isObject } from '@/utils/type';
import { isResendError } from '@/utils/resend';
import { IErrorResponse, IResponseStatus, ISuccessResponse } from '@/models/IResponse';

type Data = ISuccessResponse | IErrorResponse;

const sendMessage = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, email, message } = JSON.parse(req.body) as { name: string; email: string; message: string };

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM || !process.env.RESEND_TO) {
    res.status(400).json({ status: IResponseStatus.Error, message: 'Invalid Resend configuration' });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: `New message from ${name} (${email})`,
      text: `${name} (${email}): ${message}`,
    });

    if (isResendError(result)) {
      throw new Error(result.message);
    }

    res.status(200).json({ status: IResponseStatus.Success });
  } catch (error) {
    const errorMessage = isObject(error) && 'message' in error ? (error.message as string) : 'Unknown error';
    res.status(400).json({ status: IResponseStatus.Error, message: errorMessage });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      await sendMessage(req, res);
      break;
    default:
      res.status(400).json({ status: IResponseStatus.Error, message: 'Invalid method' });
  }
}
