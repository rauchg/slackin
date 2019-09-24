import { URLSearchParams } from 'url'
import fetch from 'isomorphic-unfetch'

export async function verifyRecaptcha(token, ip) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  })

  return res.json()
}
