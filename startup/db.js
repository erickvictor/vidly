const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function() {
  const url = 'mongodb://mosh:db987654@ds141208.mlab.com:41208/playground'
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  
mongoose.connect(url, options)
  .then(() => winston.info('Connected to MongoDB...'))

mongoose.set('useCreateIndex', true)
}