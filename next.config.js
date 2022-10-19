/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('next-with-less')
/** @type {import('next').NextConfig} */
module.exports = withLess({
  reactStrictMode: true,
  images: {
    domains: ['tekkadan.test']
  },
  compiler: {
    styledComponents: true
  }
})
