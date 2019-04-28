
/*
 * load the various environment variable options
 *
 */
const hostenv = require('hostenv')

const env = {
  port: require('hostenv').PORT || process.env.PORT || 3000,
  hostname: require('hostenv').HOSTNAME || process.env.WEBSITE_HOSTNAME || '0.0.0.0',
  channels: process.env.SLACK_CHANNELS,  
  interval: process.env.SLACK_INTERVAL || 5000,
  org: process.env.SLACK_SUBDOMAIN,
  token: process.env.SLACK_API_TOKEN,
  emails: process.env.EMAIL_SLACK_LIST,
  gcaptcha_secret: process.env.GOOGLE_CAPTCHA_SECRET,
  gcaptcha_sitekey: process.env.GOOGLE_CAPTCHA_SITEKEY
}


export default env

