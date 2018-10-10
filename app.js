const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const DB_CREATE = "CREATE DATABASE nodesql";
const TB_CREATE_DEMO = "CREATE TABLE customer( name VARCHAR(255), mobile VARCHAR(255), address VARCHAR(255) )";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodesql"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!");
});

// con.query(TB_CREATE_DEMO, (err, result) => {
//   if(err) throw err;
//   console.log("TABLE CREATED");
// });

app.post("/", (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let address = req.body.address;
  let data = [[name, mobile, address]];
  let DB_INSERT = "INSERT INTO customer (name, mobile, address) VALUES ?";
  con.query(DB_INSERT, [data], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.json({msg: "Data Inserted"});
  });
});

app.get("/", (req, res) => {
  DB_SELECT = "SELECT * from customer";
  con.query(DB_SELECT, (err, result) => {
    res.json(result);
  });
});

app.get("/:name", (req, res) => {
  DB_SELECT = "SELECT * from customer where name = ?";
  con.query(DB_SELECT, req.params.name, (err, result) => {
    if(err) throw err;
      res.json(result);
  });
});

app.listen(3000, () => console.log("Server Started"));
