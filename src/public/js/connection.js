const mysql = require('mysql')


const connectDb = function getConnection(){
    return mysql.createConnection({
        host: "localhost",
        port : '3306',
        user : 'root',
        password : 'poosa2702',
        database : "todo"
    })
}

module.exports = connectDb;