import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseQueryString = (queryString: string) => {
  const queryObject: { [key: string]: string } = {};
  const pairs = queryString.split('&');

  pairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    queryObject[key] = decodeURIComponent(value || '').replace('undefined', '');
  });

  return queryObject;
};
