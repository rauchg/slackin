import dom from 'vd';

// Localization prototype

export function join(room) {
  return ['Join ', dom('b', room), ' on Slack'];
}

export function state(active, total) {
  return active ? [
    dom('b.active', active), ' users online now of ',
    dom('b.total', total), ' registered.'
  ] : [ 
    dom('b.total', total), ' users are registered so far.'
  ];
}
  
export function getinvite(){
  return dom('button.loading', 'Get my Invite');
}
 
export function powered(){
  return 'powered by ';
}
