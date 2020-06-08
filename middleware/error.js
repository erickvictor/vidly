const winston = require('winston'); // <-- removed this from index.js (I kept 'error' requirement in index.js)
require('winston-mongodb');

const url = 'mongodb://mosh:db987654@ds141208.mlab.com:41208/playground'
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const logger = winston.createLogger({
  transports: [ // <-- removed the transports from index.js, put them here.
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ db: url, options: options, metaKey: "meta" }) // <-- { metaKey: "meta" } just makes sure the field is saved under the name 'meta' in the database, probably not necessary.
  ]
});

module.exports = function(err, req, res, next) {
  logger.error(err.message, {
    meta: {
      message: err.message,
      name: err.name,
      stack: err.stack
    }
  });

  res.status(500).send('Something failed.');
}