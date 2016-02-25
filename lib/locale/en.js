import dom from 'vd';

// Localization prototype
export default {
  locale: "en",
  meta: _ => {
    return [dom('meta http-equiv="content-language" content="en"')]
  },
  title: (name) => {
    return `Join ${name} on Slack`
  },
  join: (name, channels) => {
    return [dom('p',
      'Join ', dom('b', name),
      // mention single single-channel inline
      channels && channels.length === 1 && dom('span', ' #', channels[0]),
      ' on Slack.'
    )]
  },
  coc: (coc)  => {
    return [ dom('.coc',
      dom('label',
        dom('input type=checkbox name=coc value=1'),
        'I agree to the ',
        dom('a', { href: coc, target: '_blank', }, 'Code of Conduct'),
        '.'
        )
      )
    ]
  },
  state: (active, total) => {
    return active ? 
      [ dom('b.active', active), ' users online now of ',
        dom('b.total', total), ' registered.'] : 
      [ dom('b.total', total), ' users are registered so far.'];
  },
  getinvite: _ => {
    return [dom('button.loading', 'Get my Invite')];
  },
  powered: 'powered by ',
  not_a_permitted_channel: 'Not a permitted channel',
  no_email_provided: 'No email provided',
  signin: (org) => {
    return [dom('p.signin',
      'or ',
      dom(`a href=https://${org}.slack.com target=_top`, 'sign in'),
      '.'
    )]
  },
  channelNotFound: (channel)  => {
    return `Channel not found "${channel}"`
  },
  invalid_email: 'Invalid email',
  mandatory_coc: 'Agreement to CoC is mandatory',
  woot: 'WOOT. Check your email!'
}