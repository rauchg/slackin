import fetch from 'isomorphic-unfetch'

/**
 * Returns an absolute URL in the case of `getInitialProps`
 */
function getOrigin(req) {
  if (typeof window === 'undefined') {
    const { host } = req.headers
    const protocol = process.env.NODE_ENV === 'production' ? 'https:' : 'http:'

    return `${protocol}//${host}`
  }
  return ''
}

export async function getTeam(req) {
  const origin = getOrigin(req)
  const res = await fetch(`${origin}/api/v1/team`)

  return res.json()
}

export async function getUsers(req) {
  const origin = getOrigin(req)
  const res = await fetch(`${origin}/api/v1/users`)

  return res.json()
}

export async function inviteToSlack({ token, email, channel }) {
  try {
    const res = await fetch('/api/invite', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, email, channel }),
    })
    const data = await res.json()

    if (res.status < 200 || res.status > 300) {
      throw new Error(data.error || res.statusText)
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message || 'Server error')
  }
}
