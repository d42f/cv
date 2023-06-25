export const normalizePhone = (phone: string | undefined): string => phone?.replace(/\D/g, '') || '';

export const formatPhone = (phone: string): string => {
  const cleaned = normalizePhone(phone);
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  return match ? `+${match[1]} ${match[2]}-${match[3]}-${match[4]}` : phone;
};
