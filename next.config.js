/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tekkadan.test'],
    formats: ['image/avif', 'image/webp']
  },
  compiler: {
    styledComponents: true
  }
}
