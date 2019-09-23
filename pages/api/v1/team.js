import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN)

/**
 * Returns basic info about the team
 * https://api.slack.com/methods/team.info
 */
export default async function team(req, res) {
  try {
    const { ok, team } = await slack.team.info()

    if (!ok) {
      throw new Error('Slack was not able to handle this request')
    }

    const result = { name: team.name }

    if (!team.icon.image_default) {
      result.logo = team.icon.image_132
    }

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
