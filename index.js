const mongoose = require('mongoose')
const genres = require('./routes/genres')
const express = require('express')
const app = express()

const url = 'mongodb://mosh:db987654@ds357708.mlab.com:57708/playground'
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(url, options)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use('/api/genres', genres)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))