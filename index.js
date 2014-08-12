var workshopper = require('browser-workshopper')
  , path = require('path')

var browserifyBuiltins = require('browser-workshopper/node_modules/browserify/lib/builtins')
browserifyBuiltins.http = require.resolve('http-browserify')

require('portfinder').getPort(function (err, port) {
  if (err) throw err
  process.env.BVBB_URL = 'http://localhost:' + port + '/1'
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
})

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
