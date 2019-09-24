import emailRegex from 'email-regex'
import { channels } from '../../../utils/config'
import { verifyRecaptcha } from '../../../utils/api/recaptcha'
import slack from '../../../utils/api/slack'

const EMAIL_REGEX = emailRegex({ exact: true })

const getChannelId = async name => {
  const data = await slack.conversations.list({ exclude_archived: true })

  if (!data.ok) {
    throw new Error('Slack was not able to handle this request')
  }

  const channel = data.channels.find(c => c.name === name)

  return channel && channel.id
}

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

/**
 * Sends a invite to a Slack channel
 * https://api.slack.com/methods/team.info
 */
export default async function invite(req, res) {
  try {
    const token = req.body['g-recaptcha-response']
    const { email, channel } = req.body

    if (!token || !email || !channel) {
      throw new ApiError(400, 'Bad Request')
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new ApiError(400, 'Invalid email')
    }

    if (!channels.includes(channel)) {
      throw new ApiError(400, 'Not a permitted channel')
    }

    const recaptcha = await verifyRecaptcha(token, req.connection.remoteAddress)

    if (!recaptcha.success || recaptcha.score < 0.5 || recaptcha.action !== 'invite') {
      throw new ApiError(400, 'Are you human?')
    }

    const channelId = await getChannelId(channel)

    if (!channelId) {
      throw new ApiError(400, `Channel not found: #${channel}`)
    }

    res.json({ message: 'Yay!' })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).json({ error: error.message })
  }
}
