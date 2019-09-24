import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN)

export default slack
