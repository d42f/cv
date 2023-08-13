import { NextApiRequest, NextApiResponse } from 'next';

import { isObject } from '@/utils/type';

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = JSON.parse(req.body) as { name: string; email: string; message: string };

  if (
    !process.env.EMAILJS_SEND_URL ||
    !process.env.EMAILJS_USER_ID ||
    !process.env.EMAILJS_SERVICE_ID ||
    !process.env.EMAILJS_TEMPLATE_ID
  ) {
    res.status(400).json({ message: 'Invalid EMAILJS configuration' });
    return;
  }

  try {
    const data = {
      user_id: process.env.EMAILJS_USER_ID,
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      template_params: { name, email, message },
    };
    //
    const { status, statusText } = await fetch(process.env.EMAILJS_SEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (status !== 200) {
      throw new Error(statusText);
    }
    res.status(200).json({ status: statusText });
  } catch (error) {
    res.status(400).json(isObject(error) && 'message' in error ? { error: error.message } : 'Unknown error');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      await sendMessage(req, res);
      break;
    default:
      res.status(400).json({ message: 'Invalid method' });
  }
}
