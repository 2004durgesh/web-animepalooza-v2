import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const parseQueryString = (queryString) => {
  const queryObject = {};
  const pairs = queryString.split('&');

  pairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    queryObject[key] = decodeURIComponent(value || '').replace('undefined', '');
  });

  return queryObject;
};

