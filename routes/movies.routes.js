const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies/create", async (req, res, next) => {
    
    try {
        const allCelebs = await Celeb.find();
        console.log(allCelebs);

        res.render("movies/new-movie", {allCelebs});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post("/movies/create", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body;

    try {
        const createdMovie = await Movie.create({title, genre, plot, cast});
        res.redirect("/movies/");
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/movies", async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        res.render("movies/movies", {allMovies});
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/movies/:id", async (req, res, next) =>{
    
    try {
        const movieId = req.params.id;
        const moviePicked = await Movie.findById(movieId).populate("cast");
        console.log(moviePicked)
        res.render("movies/movie-details", moviePicked);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/movies/delete/:id", async (req, res, next) => {
    try {
        const movieId = req.params.id;
        await Movie.findByIdAndRemove(movieId);
        res.redirect("/movies");
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/movies/edit/:id", async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const selectedMovie = await Movie.findById(movieId);
        const allCelebs = await Celeb.find();
        res.render("movies/edit-movie", {selectedMovie, allCelebs});
    } catch (error) {
        console.log(error);
        next(error);
    }
})





router.post("/movies/edit/:id", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    const movieId = req.params.id
    try {
        const editedMovie = await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast})
        res.redirect(`/movies/${movieId}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
})



module.exports = router;