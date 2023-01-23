/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    USERS_API_URL: process.env.USERS_API_URL,
    USERS_COURSES_API_URL: process.env.USERS_COURSES_API_URL,
    CURRENCY_API_URL: process.env.CURRENCY_API_URL,
    API_KEY: process.env.API_KEY,
  },
}

module.exports = nextConfig
