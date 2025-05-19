export function isNullOrEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
}

export const validEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const removeAccents = (string: string) => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const truncateText = (text: string, maxLength: number) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const removeSpaces = (string: string) => {
  return string.replace(/\s+/g, '');
};

export const toSlug = (string: string) => {
  return removeAccents(string.toLowerCase())
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};