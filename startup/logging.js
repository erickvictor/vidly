const winston = require('winston')
// require('winston-mongodb')
require('express-async-errors')

module.exports = function() {
  // const url = 'mongodb://mosh:db987654@ds141208.mlab.com:41208/playground'
  // const options = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }

  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  )

  process.on('unhandledRejection', (ex) => {
    throw ex
  })

  // winston.add(new winston.transports.File({ filename: "logfile.log" }))
  // winston.add(new winston.transports.MongoDB({ 
  //   db: url, 
  //   options: options, 
  //   metaKey: 'meta', 
  //   level: 'info' 
  // }))

}