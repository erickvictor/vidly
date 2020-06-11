const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')

module.exports = function() {
  const url = config.get('db')
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  
mongoose.connect(url, options)
  .then(() => winston.info(`Connected to ${url}...`))

mongoose.set('useCreateIndex', true)
}