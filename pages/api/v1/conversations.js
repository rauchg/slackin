import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN)

export default async function conversations(req, res) {
  try {
    const data = await slack.conversations.list({ exclude_archived: true })
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
