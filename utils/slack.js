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
