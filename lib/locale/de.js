import dom from 'vd';

export function join(room) {
  return ['Trete ', dom('b', room), ' auf Slack bei'];
}

export function state(active, total) {
  return active ? [
    dom('b.active', active), ' Nutzer ', ((active===1)? 'ist' : 'sind') ,' gerade online von insgesamt ',
    dom('b.total', total), ' registrierten.'
  ] : [
    dom('b.total', total), ' Benutzer haben sich bisher registriert.'
  ];
}

export function getinvite() {
  return dom('button.loading', 'Lade mich ein');
}

export function powered() {
  return 'powered by ';
}
