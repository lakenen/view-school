var workshopper = require('browser-workshopper')
  , mkdirp = require('mkdirp')
  , path = require('path')

var answers = path.resolve(process.cwd(), 'answers')
mkdirp.sync(answers)
process.chdir(answers)
workshopper({
  exercises: require('./exercises')
  , exercisesDir: path.resolve(__dirname, 'exercises')
  , title: 'Example Workshopper'
})
