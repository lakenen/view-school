var workshopper = require('browser-workshopper')
  , mkdirp = require('mkdirp')
  , path = require('path')

var answers = path.resolve(process.cwd(), 'answers')
mkdirp.sync(answers)
process.chdir(answers)

require('portfinder').getPort(function (err, port) {
  if (err) throw err
  process.env.BVBB_URL = 'http://localhost:' + port + '/proxy'
  workshopper({
      port: port
    , exercises: require('./exercises')
    , exercisesDir: path.resolve(__dirname, 'exercises')
    , title: 'View School'
    , mainBundler: require('./bundler')
  })
});
