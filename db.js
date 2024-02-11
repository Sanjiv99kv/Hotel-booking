const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "hotel"
});

connection.connect((e)=>{
    if(!e){
        console.log('connected to mysql');
    }
    else{
        console.log(e);
    }
});

module.exports = connection;