var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/all', function(req, res, next) {
  conn.query("SELECT * FROM sample.publications", function(err,data,field){
      res.send(data)
  })
});

router.post('/user', function(req, res, next) {
    var user = req.body.user
    var query = "SELECT publications.id, title, year FROM publications INNER JOIN users ON users.id = publications.student_id where users.first_name='"+user+"'"
    conn.query(query, function(err,data,field){
    res.send(data)
    })
  });


  router.post('/user/add', function(req, res, next) {
    var userId = req.body.userId
    var title = req.body.title
    var year = req.body.year
    var query = "INSERT INTO sample.publications (student_id, title, year) VALUES ('"+userId+"','"+title+"','"+year+"');"
    console.log(query)
    conn.query(query, function(err,data,field){
    res.send(data)
    })
  });

  router.post('/user/update', function(req, res, next) {
    var id = req.body.id
    var title = req.body.title
    var year = req.body.year
    var query = "UPDATE publications SET title='"+title+"',  year ='"+ year+"' WHERE  id like '"+id+"';"
    console.log(query)
    conn.query(query, function(err,data,field){
    res.send(data)
    })
  });

  router.post('/user/delete', function(req, res, next) {
    var id = req.body.id
    var query = "DELETE FROM publications WHERE id like '"+id+"';"
    console.log(query)
    conn.query(query, function(err,data,field){
    res.send(data)
    })
  });

module.exports = router;
