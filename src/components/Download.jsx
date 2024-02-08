"use client"
import useDownloader from 'react-use-downloader';
import React from 'react';

const Download = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const fileUrl = '/animepalooza.apk';
  const filename = 'animepalooza.apk';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          Download is {isInProgress ? 'in progress' : 'stopped'}
        </p>
        <button
          onClick={() => download(fileUrl, filename)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
        >
          Download File
        </button>
        <button
          onClick={() => cancel()}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Cancel Download
        </button>
        <p className="mt-4">Download size: {size} bytes</p>
        <label className="block mt-2" htmlFor="file">
          Downloading progress:
        </label>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {percentage}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="rounded-full bg-blue-500 text-xs leading-none py-1 px-3 text-white"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <p className="mt-4">Elapsed time: {elapsed} seconds</p>
        {error && (
          <p className="mt-4 text-red-500">Possible error: {JSON.stringify(error)}</p>
        )}
      </div>
    </div>
  );
};

export default Download;
