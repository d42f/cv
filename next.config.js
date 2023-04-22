/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
  publicRuntimeConfig: {
    appName: 'Dmitrii Frolov`s CV',
    author: 'dmitri.frolof@gmail.com',
  },
};

module.exports = nextConfig;
