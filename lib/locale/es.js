import dom from 'vd';

export default {
  locale: "es",
  meta: _ => {
    return [dom('meta http-equiv="content-language" content="es"')]
  },
  title: (name) => {
    return `Unirse a ${name} en Slack`
  },
  join: (name, channels) => {
    return [dom('p',
      'Unirse a ', dom('b', name),
      // mention single single-channel inline
      channels && channels.length === 1 && dom('span', ' #', channels[0]),
      ' en Slack.'
    )]
  },
  coc: (coc)  => {
    return [ dom('.coc',
      dom('label',
        dom('input type=checkbox name=coc value=1'),
        'Acepto el ',
        dom('a', { href: coc, target: '_blank', }, 'Código de Conducta'),
        '.'
        )
      )
    ]
  },
  state: (active, total) => {
    return active ? 
      [ dom('b.active', active), ' usuarios online de ',
        dom('b.total', total), ' registrados.'] : 
      [ dom('b.total', total), ' usuarios registrados hasta el momento.'];
  },
  getinvite: _ => {
    return [dom('button.loading', 'Obtener mi invitación')];
  },
  powered: 'powered by ',
  not_a_permitted_channel: 'Canal no permitido',
  no_email_provided: 'No ha provisto ningún email',
  signin: (org) => {
    return [dom('p.signin',
      'o ',
      dom(`a href=https://${org}.slack.com target=_top`, 'inicia sesión'),
      '.'
    )]
  },
  channelNotFound: (channel)  => {
    return `Canal "${channel}" no encontrado`
  },
  invalid_email: 'Email invalido',
  mandatory_coc: 'Aceptar el CoC es obligatorio',
  woot: 'WOOT. Revisa tu email!'
}

