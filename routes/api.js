/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require("../models.js").Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find({}, (err, data) => {
        if (!data){
          res.json([]);
        } else {
          const formatData = data.map(book => {
            return {
              _id: book._id,
              title: book.title,
              comments: book.comments,
              commentCount: book.comments.length,
            }
          })
          res.json(formatData)
        }
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if (!title) {
        return res.send("missing required field title")
      }

      const newBook = new Book({
        title,
        comments: []
      })
      newBook.save((err, data) => {
        if( err || !data ){
          res.send("there was an error saving")
        } else {
          res.json({ title: data.title, _id: data._id })
        }
      });
    })
    
    .delete(function(req, res){
      Book.deleteMany({}, (err, data) => {
        if (err || !data ) {
          res.send("error")
        } else {
          res.send("complete delete successful")
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findById(bookid, (err, data) => {
        if(!data) {
          res.send("no book exists")
        } else {
          res.json({
            comments: data.comments,
            _id: data._id,
            title: data.title,
            commentCount: data.comments.length
          })
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
