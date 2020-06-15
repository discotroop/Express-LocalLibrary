var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');


// Display list of all Authors.
exports.genre_list = function(req, res, next) {

    Genre.find()
      .populate('genre')
      .sort([['family_name', 'ascending']])
      .exec(function (err, list_genre) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('genre_list', { title: 'Genre List', genre_list: list_genre });
      });
  
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {

    // use async parallel to to query for genre name and associated books.
    async.parallel({
        // query genre name
        genre: function(callback) {
            Genre.findById(req.params.id) // genre id is encoded at end of URL and fetched with params.id
              .exec(callback);
        },

        // query books in genre
        genre_books: function(callback) {
            Book.find({ 'genre': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });

};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};