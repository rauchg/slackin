import dbg from 'debug'
const debug = dbg('slackin')

export default function log (slack, silent){
  // keep track of elapsed time
  let last

  out('fetching')

  // attach events
  slack.on('ready', () => out('ready'))
  slack.on('retry', () => out('retrying'))

  slack.on('fetch', () => {
    last = new Date
    out('fetching')
  })

  slack.on('data', online)

  // log online users
  function online (){
    out('online %d, total %d %s',
      slack.users.active,
      slack.users.total,
      last ? `(+${new Date - last}ms)` : '')
  }

  // print out errors and warnings
  if (!silent) {
    slack.on('error', (err) => {
      console.error('%s – ' + err.stack, new Date)
    })

    slack.on('ready', () => {
      if (!slack.org.logo && !silent) {
        console.warn('\u001b[92mWARN: no logo configured\u001b[39m')
      }
    })
  }

  function out (...args){
    if (args) {
      args[0] = `${new Date} – ${args[0]}`
    }

    if (silent) return debug(...args)
    console.log(...args)
  }
}
