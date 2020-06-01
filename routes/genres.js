const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}))

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})

router.post('/', async (req,res) => {
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save()
  
  res.send(genre)
})

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
  })
  res.send(genre)
  } else {
    return res.status(404).send('The genre with the given ID was not found.')
  }

  // const genre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name }, {new: true}, (err, doc) => {
  //   if (err) {
  //       console.log("Something wrong when updating data!");
  //   }
  //   console.log(doc);
  // })

  // if (!genre) return res.status(404).send('The genre with the given ID was not found.')

  
})

router.delete('/:id', async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    res.send(genre)
  } else {
    return res.status(404).send('The genre with the given ID was not found.')
  }
  // if (!genre) return res.status(404).send('The genre with the given ID was not found.')
})

router.get('/:id', async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const genre = await Genre.findById(req.params.id)
    res.send(genre)
  } else {
    return res.status(404).send('The genre with the given ID was not found.')
  }
  // if (!genre) return res.status(404).send('The genre with the given ID was not found.')
  
})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })

  return schema.validate(genre)
}

module.exports = router