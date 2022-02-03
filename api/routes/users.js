var express = require('express');
var router = express.Router();
var conn = require('../db');

/* GET users listing. */
router.get('/all', function(req, res, next) {
  conn.query("SELECT * FROM sample.users", function(err,data,field){
    res.send(data)
})
});

router.post('/add', function(req, res, next) {
  var email = req.body.email
  var first = req.body.first
  var last = req.body.last
  var query ="INSERT INTO sample.users (email, first_name, last_name) VALUES ('"+email+"','"+first+"','"+last+"');"
  console.log(query)
  conn.query(query, function(err,data,field){
    res.send(data)
})
});
module.exports = router;
