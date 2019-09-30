import slack from '../../../utils/api/slack'
/**
 * Returns basic info about the team
 * https://api.slack.com/methods/team.info
 */
export default async function team(req, res) {
  if (req.method !== 'GET') {
    res.status(404).end()
    return
  }

  try {
    const { ok, team } = await slack.team.info()

    if (!ok) {
      throw new Error('An unexpected error occurred with Slack')
    }

    const result = { name: team.name }

    if (!team.icon.image_default) {
      result.logo = team.icon.image_132
    }

    res.setHeader('Cache-Control', 's-maxage=7200, stale-while-revalidate')
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
