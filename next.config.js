module.exports = {
  experimental: {
    publicDirectory: true,
  },
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    SLACK_OAUTH_ACCESS_TOKEN: process.env.SLACK_OAUTH_ACCESS_TOKEN,
    SLACK_LEGACY_TOKEN: process.env.SLACK_LEGACY_TOKEN,
    SLACK_COC: process.env.SLACK_COC,
    SLACK_CHANNELS: process.env.SLACK_CHANNELS,
  },
}
