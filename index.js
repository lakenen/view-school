var workshopper = require('browser-workshopper')
  , path = require('path')
  , args = require('minimist')(process.argv.slice(2))

var browserifyBuiltins = require('browser-workshopper/node_modules/browserify/lib/builtins')
browserifyBuiltins.http = require.resolve('http-browserify')
browserifyBuiltins._process = require.resolve('process/browser')

function start(port) {
  process.env.BVBB_URL = 'http://localhost:' + port + '/1'
  process.env.VERSION = require('./package').version
  workshopper({
      port: port
    , exercises: require('./exercises')
    , exercisesDir: path.resolve(__dirname, 'exercises')
    , title: 'Box View School'
    , bundlerOpts: {
        builtins: browserifyBuiltins
      }
    , mainBundler: require('./bundler')
  })
}

if (args.p) {
  start(args.p)
} else {
  require('portfinder').getPort(function (err, port) {
    if (err) throw err
    start(port)
  })
}

process.on('uncaughtException', function (err) {
  console.log('APP IS CRASHING:', err.stack || err)
});

process.on('exit', exit)
process.on('SIGINT', function () {
  process.exit()
});

function exit() {
  console.log(
    '\nSad to see you go!\n\n' +
    'To run the workshop again, type `view-school` in this directory.\n' +
    'Don\'t worry, your answers will not be overwritten!'
  )
}
