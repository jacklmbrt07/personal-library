/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let id1 = "";

suite('Functional Tests', function() {

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
        .request(server)
        .post("/api/books")
        .send({
          title: "Title"
        })
        .end((err, res) => {
          id1 = res.body._id;
          assert.equal(res.status, 200);
          assert.equal(res.body.title, "Title")
          assert.equal(res.body._id, id1)
          done();
        })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .post("/api/books")
          .send({
            title: ""
          })
          .end((err, res) => {
            assert.equal(res.text, "missing required field title")
            done();
          })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .get("/api/books")
          .query({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "title")
            assert.property(res.body[0], "_id")
            assert.property(res.body[0], "comments")
            done();
          })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai 
          .request(server)
          .get("/api/books/:id")
          .send({ _id: "123456789"})
          .end((err, res) => {
            assert.equal(res.text, "no book exists")
            done();
          })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .get("/api/books")
          .send({ _id: id1})
          .end((err, res) => {
            assert.equal(res.body[0].title, "Title")
            assert.equal(res.body[0]._id, id1)
            assert.isArray(res.body[0].comments)
            done();
          })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        //done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        //done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        //done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        //done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
          .request(server)
          .delete("/api/books")
          .send({})
          .end((err, res) => {
            assert.equal(res.text, "complete delete successful")
            done();
          })
      });

    });

  });

});
