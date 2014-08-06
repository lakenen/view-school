var workshopper = require('browser-workshopper')
  , mkdirp = require('mkdirp')
  , path = require('path')

var answers = path.resolve(process.cwd(), 'answers')
mkdirp.sync(answers)
process.chdir(answers)

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
});
