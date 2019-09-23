import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN)

/**
 * Consider doing this in a different way, the users.list method is Tier 2 (20+ per minute)
 * https://api.slack.com/methods/users.list
 */
export default async function users(req, res) {
  try {
    const { ok, members } = await slack.users.list({ presence: true })

    if (!ok) {
      throw new Error('Slack was not able to handle this request')
    }

    let total = 0
    let active = 0

    members.forEach(m => {
      // Remove Slackbot and bots from the members.
      // Slackbot is not a bot, go figure.
      if (m.id === 'USLACKBOT' || m.is_bot || m.deleted) return

      total += 1
      if (m.presence === 'active') {
        active += 1
      }
    })

    res.json({ users: { total, active } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
