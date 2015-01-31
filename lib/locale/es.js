import dom from 'vd';

export function join(room) {
  return ['Unirse a ', dom('b', room), ' en Slack'];
}

export function state(active, total) {
  return active ? [
    dom('b.active', active), ' usuario online de ',
    dom('b.total', total), ' registrados.'
  ] : [
    dom('b.total', total), ' usuarios registrados hasta el momento.'
  ];  
}
  
export function getinvite() {
  return dom('button.loading', 'Obtener mi invitación');
}
 
export function powered() {
  return 'powered by ';  
}

