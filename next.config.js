/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
  publicRuntimeConfig: {
    appName: 'Dmitrii Frolov CV',
    author: 'dmitri.frolof@gmail.com',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
