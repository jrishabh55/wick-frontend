import React, { ButtonHTMLAttributes } from 'react';

export const Button = ({ children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="rounded-lg border border-gray-400 hover:shadow-lg hover:border-gray-600 active:bg-blue-800 active:border-gray-600 shadow-md p-2 bg-blue-500 text-white disabled m-2"
    {...props}
  >
    {children}
  </button>
);
