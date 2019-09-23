module.exports = {
  experimental: {
    publicDirectory: true,
  },
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    SLACK_CHANNELS: process.env.SLACK_CHANNELS,
  },
}
