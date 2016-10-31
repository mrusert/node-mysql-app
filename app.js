var express = require("express");
var mysql = require('mysql');
var app = express();

// Create MySQL DB connection
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 'dbpassword',
  database : 'form_data'
});

// Connect to MySQL DB
conn.connect(function(err){
	if(err){
		console.log('Error connecting to database');
	} else {
		console.log('Database is connected...')
	}
});

// Static File Server and Routes Dir Path
app.use(express.static(__dirname + '/public'));
app.use(require('./routes/index'));
app.use(require('./routes/adduser'));

// Set View Enging and View Dir Path
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Set DB connection as Global Variable
app.set('appDB', conn);

app.listen(3000);
console.log("Express MySQL app running on port 3000");
