require('slackin')({
  token: process.env.SLACK_API_TOKEN, // required
  interval: 1000,
  org: process.env.SLACK_ORG, // required
  channel: process.env.SLACK_CHANNEL || guest, // for single channel mode,
  silent: false // suppresses warnings
}).listen(3000);
