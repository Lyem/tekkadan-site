/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('next-with-less')
/** @type {import('next').NextConfig} */
module.exports = withLess({
  reactStrictMode: true,
  images: {
    domains: ['https://7288-2804-1964-261-d000-e640-43b6-402-cf7e.sa.ngrok.io']
  },
  compiler: {
    styledComponents: true
  }
})
