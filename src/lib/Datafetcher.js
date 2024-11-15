'use server';

import { cache } from 'react';

const CACHE_TIME = 3600; // 1 hour

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

const createQueryString = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

const fetchData = cache(async (service, provider, otherParams, params = {}, options = {}) => {
  const queryString = createQueryString(params);
  const url = `${process.env.API_BASE_URL}/${service}/${provider}/${otherParams}?${queryString}`;

  console.log('Fetching URL:', url);

  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || '',
      ...(provider === 'anilist' ? { Referer: 'https://anilist.co/' } : {}),
      ...options.headers,
    },
    next: { revalidate: options.next?.revalidate || CACHE_TIME },
    ...options,
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new APIError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();

    if (data === null || data === undefined) {
      throw new APIError('No data found', 404);
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
});

export default fetchData;
