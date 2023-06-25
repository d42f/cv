import { normalizePhone } from './phone';

export const linkEmail = (email: string): string => `mailto:${email}`;

export const linkPhone = (phone: string): string => `tel:+${normalizePhone(phone)}`;

export const linkTelegram = (telegram: string): string => `tg://resolve?domain=${telegram}`;
