import dom from 'vd';

export default {
  locale: "de",
  meta: _ => {
    return [dom('meta http-equiv="content-language" content="de"')]
  },
  title: (name) => {
    return `Trete ${name} auf Slack bei`
  },
  join: (name, channels) => {
    return [dom('p',
      'Trete ', dom('b', name),
      // mention single single-channel inline
      channels && channels.length === 1 && dom('span', ' #', channels[0]),
      ' auf Slack bei.'
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
    return active ? [
      dom('b.active', active), ' Nutzer ', ((active===1)? 'ist' : 'sind') ,' gerade online von insgesamt ',
      dom('b.total', total), ' registrierten.'
      ] : [
      dom('b.total', total), ' Benutzer haben sich bisher registriert.'];
  },
  getinvite: _ => {
    return [dom('button.loading', 'Lade mich ein')];
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
