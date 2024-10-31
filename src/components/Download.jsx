'use client';
import useDownloader from 'react-use-downloader';
import React from 'react';

const Download = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const fileUrl = '/animepalooza.apk';
  const filename = 'animepalooza.apk';

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='rounded-lg bg-white p-8 shadow-md'>
        <p className='mb-4 text-lg'>
          Download is {isInProgress ? 'in progress' : 'stopped'}
        </p>
        <button
          onClick={() => download(fileUrl, filename)}
          className='mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          Download File
        </button>
        <button
          onClick={() => cancel()}
          className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
        >
          Cancel Download
        </button>
        <p className='mt-4'>Download size: {size} bytes</p>
        <label className='mt-2 block' htmlFor='file'>
          Downloading progress:
        </label>
        <div className='relative pt-1'>
          <div className='mb-2 flex items-center justify-between'>
            <div>
              <span className='inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-600'>
                {percentage}%
              </span>
            </div>
          </div>
          <div className='flex items-center justify-start'>
            <div className='w-full rounded-full bg-gray-200'>
              <div
                className='rounded-full bg-blue-500 px-3 py-1 text-xs leading-none text-white'
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <p className='mt-4'>Elapsed time: {elapsed} seconds</p>
        {error && (
          <p className='mt-4 text-red-500'>
            Possible error: {JSON.stringify(error)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Download;
