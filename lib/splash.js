
import dom from 'vd';

export default function splash({ name, logo, active, total, channel, iframe }){
  let div = dom('.splash',
    !iframe && dom('.logos',
      logo && dom('.logo.org'),
      dom('.logo.slack')
    ),
    dom('p', 
      'Join ', dom('b', name),
      channel && dom('span', ' #', channel),
      ' on Slack.'
    ),
    dom('p.status',
      active
        ? [
          dom('b.active', active), ' users online now of ',
          dom('b.total', total), ' registered.'
        ]
        : [dom('b.total', total), ' users are registered so far.']
    ),
    dom('form',
      dom('input type=email placeholder=you@yourdomain.com '
        + (!iframe ? 'autofocus' : '')),
      dom('button.loading', 'Get my Invite')
    ),
    !iframe && dom('footer',
      'powered by ',
      dom('a href=http://rauchg.com/slackin target=_blank', 'slackin')
    ),
    style({ logo, active, iframe }),
    // xxx: single build
    dom('script src=https://cdn.socket.io/socket.io-1.3.2.js'),
    dom('script src=/assets/superagent.js'),
    dom('script src=/assets/client.js')
  );
  return div;
}

const pink = '#E01563';

function style({ logo, active, iframe } = {}){
  var css = dom.style();

  css.add('.splash', {
    'width': iframe ? '250px' : '300px',
    'margin': iframe ? '0' : '200px auto',
    'text-align': 'center',
    'font-family': '"Helvetica Neue", Helvetica, Arial'
  });

  if (iframe) {
    css.add('body, html', {
      'margin': '0',
      'padding': '0',
      'background': '#FAFAFA',
      'overflow': 'hidden' // ff
    });

    css.add('.splash', {
      'box-sizing': 'border-box',
      'padding': '10px'
    });
  }

  if (!iframe) {
    css
    .media('(max-width: 500px)')
    .add('.splash', {
      'margin-top': '100px'
    });
  }

  css.add('.head', {
    'margin-bottom': '40px'
  });

  css.add('.logos', {
    'position': 'relative',
    'margin-bottom': '40px'
  });

  if (!iframe) {
    css.add('.logo', {
      'width': '48px',
      'height': '48px',
      'display': 'inline-block',
      'background-size': 'cover'
    });

    css.add('.logo.slack', {
      'background-image': 'url(/assets/slack.svg)'
    });

    if (logo) {
      let pw = 10; // '+' width
      let lp = 30; // logos separation

      css.add('.logo.org::after', {
        'position': 'absolute',
        'display': 'block',
        'content': '"+"',
        'top': '15px',
        'left': '0',
        'width': '300px',
        'text-align': 'center',
        'color': '#D6D6D6',
        'font': '15px Helvetica Neue'
      });

      css.add('.logo.org', {
        'background-image': `url(${logo})`,
        'margin-right': `${lp + pw + lp}px`
      });
    }
  }

  css.add('p', {
    'font-size': iframe ? '12px' : '15px',
    'margin': iframe ? '0 0 5px' : '5px 0'
  });

  if (iframe) {
    css.add('p.status', {
      'font-size': '11px'
    });
  }

  css.add('button, input', {
    'font-size': '12px',
    'height': '32px',
    'line-height': '32px',
    'vertical-align': 'middle',
    'display': 'block',
    'text-align': 'center',
    'box-sizing': 'border-box',
    'width': '100%'
  });

  css.add('button', {
    'color': '#fff',
    'margin-top': iframe ? '5px' : '10px',
    'font-weight': 'bold',
    'border-width': 0,
    'background': pink,
    'text-transform': 'uppercase',
    'cursor': 'pointer',
    'appearence': 'none',
    '-webkit-appearence': 'none',
    'padding': '0',
    'outline': '0',
    'transition': 'background-color 150ms ease-in, color 150ms ease-in'
  });

  css.add('button.loading', {
    'pointer-events': 'none'
  });

  css.add('button:disabled', {
    'color': '#9B9B9B',
    'background-color': '#D6D6D6',
    'cursor': 'default',
    'pointer-events': 'none'
  });

  css.add('button.error', {
    'background-color': '#F4001E'
  });

  css.add('button.success:disabled', {
    'color': '#fff',
    'background-color': '#68C200'
  });

  css.add('button:not(.disabled):active', {
    'background-color': '#7A002F',
  });

  css.add('b', {
    'transition': 'transform 150ms ease-in'
  });

  css.add('b.grow', {
    'transform': 'scale(1.3)'
  });

  css.add('form', {
    'margin-top': iframe ? '10px' : '20px',
    'margin-bottom': '0'
  });

  css.add('input', {
    'color': '#9B9B9B',
    'border': '1px solid #D6D6D6'
  });

  if (iframe) {
    css.add('input, button', {
      'font-size': '11px',
      'height': '28px',
      'line-height': '28px'
    });
  }

  css.add('input:focus', {
    'color': '#666',
    'border-color': '#999',
    'outline': '0'
  });

  if (active) {
    css.add('.active', {
      'color': pink
    });
  }

  if (!iframe) {
    css.add('footer', {
      'color': '#D6D6D6',
      'font-size': '11px',
      'margin': '200px auto 0',
      'width': '300px',
      'text-align': 'center',
    });

    css.add('footer a', {
      'color': '#9B9B9B',
      'text-decoration': 'none',
      'border-bottom': '1px solid #9B9B9B'
    });

    css.add('footer a:hover', {
      'color': '#fff',
      'background-color': '#9B9B9B'
    });
  }

  return css;
}
