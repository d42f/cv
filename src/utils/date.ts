const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const zero = (num: number): string => (num < 10 ? '0' : '') + num;

export const formatDate = (date: Date | string, mask: string): string => {
  date = new Date(date);
  switch (mask) {
    case 'yyyy':
      return `${date.getFullYear()}`;
    case 'mm yyyy':
      return `${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
    case 'yyyy-mm':
      return `${date.getFullYear()}-${zero(date.getMonth() + 1)}`;
  }
  return date.toString();
};

export const formatDateRange = (from: string, to: string | null, dateMask: string): string =>
  `${formatDate(from, dateMask)} — ${to ? formatDate(to, dateMask) : 'Present'}`;
