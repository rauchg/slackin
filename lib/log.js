
import dbg from 'debug';
const debug = dbg('slackin');

export default function log(slack, silent){
  // keep track of elapsed time
  let last;

  log('fetching');

  // attach events
  slack.on('ready', () => log('ready'));
  slack.on('retry', () => log('retrying'));
  slack.on('fetch', () => {
    last = new Date;
    log('fetching');
  });
  slack.on('data', online);

  // log online users
  function online(){
    log('online %d, total %d %s',
      slack.users.active,
      slack.users.total,
      last ? `(+${new Date - last}ms)` : '');
  }

  // print out errors and warnings
  if (!silent) {
    slack.on('error', (err) => {
      console.error('%s – ' + err.stack, new Date);
    });
    slack.on('ready', () => {
      if (!slack.org.logo && !silent) {
        console.warn('\033[92mWARN: no logo configured\033[39m');
      }
    });
  }

  function log(...args){
    if (silent) return debug(...args);
    args[0] = `${new Date} – ${args[0]}`;
    console.log(...args);
  }
}
