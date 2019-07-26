const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
  });
  
  router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message +"from movies");
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre');

    let movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    await movie.save();
    res.send(movie);
  });

module.exports = router;