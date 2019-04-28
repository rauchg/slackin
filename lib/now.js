// get our env vars, since this entry is for non-CLI
const env = require('./env'),
slackin = require('./index').default,
flags = env.default

slackin(flags).listen(flags.port, flags.hostname, function (err) {
  if (err) throw err
  if (!flags.silent) console.log('%s – listening on %s:%d', new Date, flags.hostname, flags.port)
})

