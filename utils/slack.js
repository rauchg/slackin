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

function getJson(res) {
  const contentType = res.headers.get('Content-Type')
  const isJSON = contentType && contentType.startsWith('application/json')

  return isJSON ? res.json() : undefined
}

export async function getTeam(req) {
  const origin = getOrigin(req)
  const res = await fetch(`${origin}/api/v1/team`)

  return getJson(res)
}

export async function getUsers(req) {
  const origin = getOrigin(req)
  const res = await fetch(`${origin}/api/v1/users`)

  return getJson(res)
}

export async function inviteToSlack({ token, email, channel }) {
  try {
    const res = await fetch('/api/v1/invite', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'g-recaptcha-response': token, email, channel }),
    })
    const data = await getJson(res)

    if (res.status < 200 || res.status > 300) {
      throw new Error((data && data.error) || res.statusText)
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message || 'Server error')
  }
}
