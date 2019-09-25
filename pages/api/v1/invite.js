import emailRegex from 'email-regex'
import fetch from 'isomorphic-unfetch'
import { channels } from '../../../utils/config'
import { verifyRecaptcha } from '../../../utils/api/recaptcha'
import slack from '../../../utils/api/slack'

const EMAIL_REGEX = emailRegex({ exact: true })

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

/**
 * Lists public channels and returns the id of the channel that matches the name
 * https://api.slack.com/methods/conversations.list
 */
async function getChannelId(name) {
  const data = await slack.conversations.list({ exclude_archived: true })

  if (!data.ok) {
    throw new Error('An unexpected error occurred with Slack')
  }

  const channel = data.channels.find(c => c.name === name)

  return channel && channel.id
}

/**
 * Sends an invite email to a Slack channel, this uses a legacy token and an undocumented API because
 * there are no more options.
 * https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md
 */
async function inviteToSlack({ email, channel }) {
  const res = await fetch('https://slack.com/api/users.admin.invite', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: process.env.SLACK_OAUTH_ACCESS_TOKEN,
      channels: channel,
      ultra_restricted: true,
      resend: true,
      email,
    }),
  })

  if (res.status !== 200) {
    throw new Error(`Slack invite failed with status: ${res.status}`)
  }

  return res.json()
}

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

    const data = await inviteToSlack({ email, channel })
    const { ok, error } = data
    const result = { message: 'WOOT. Check your email!' }

    console.log('SLACK INVITE', data)

    if (!ok) {
      switch (error) {
        case 'already_invited':
          throw new ApiError(
            403,
            'You have already been invited to Slack. Check for an email from feedback@slack.com.'
          )
        case 'already_in_team':
          result.message = 'Sending you to Slack...'
          result.alreadyInTeam = true
          break
        case 'invalid_email':
          throw new ApiError(403, 'This email is not accepted by Slack')
        case 'channel_not_found':
          throw new ApiError(403, 'Channel not found in Slack')
        case 'invite_limit_reached':
          throw new ApiError(403, 'The channel is full')
        case 'sent_recently':
          throw new ApiError(403, 'An email was already sent, try again later')
        // Is this about us or the user?
        case 'user_disabled':
          throw new ApiError(400, 'Your account has been deactivated')
        default:
          throw new Error('An unexpected error occurred with Slack')
      }
    }

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).json({ error: error.message })
  }
}
