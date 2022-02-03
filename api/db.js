const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "sample",
});

conn.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

module.exports = conn;