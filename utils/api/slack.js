import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN || process.env.SLACK_LEGACY_TOKEN)

export default slack
