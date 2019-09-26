import slack from '../../../utils/api/slack'
/**
 * Returns a count of total and active users
 * https://api.slack.com/methods/users.list
 */
export default async function users(req, res) {
  try {
    // The client has a poller to this endpoint, it can quickly exceed the rate
    // limit in Slack: Tier 2 (20+ per minute)
    if (process.env.NODE_ENV !== 'production') {
      res.json({
        users: {
          total: Math.round(Math.random()) > 0 ? 630 : 635,
          active: Math.floor(Math.random() * (100 - 60)) + 60,
        },
      })
      return
    }

    const { ok, members } = await slack.users.list({ presence: true })

    if (!ok) {
      throw new Error('An unexpected error occurred with Slack')
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

    // Cache this response, this same response will be used for all users thanks to SPR
    res.setHeader('cache-control', 's-maxage=4,stale-while-revalidate')

    res.json({ users: { total, active } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
