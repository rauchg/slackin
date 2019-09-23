import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN)

export default async function teamInfo(req, res) {
  try {
    const data = await slack.team.info()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
