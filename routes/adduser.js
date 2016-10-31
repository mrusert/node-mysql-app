var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

// GET New User Form
router.get('/adduser', function(req, res) {
	res.render('adduser', {
		pageID: 'form'
	});
});

// POST New User Form
router.post('/adduser', function(req, res){
	
	var conn = req.app.get('appDB');
	
	conn.query('INSERT INTO user SET ?', req.body, function(err, result){
		if (err) {
			console.log('Error adding user: ' + err.code);
			res.send('Error adding user: ' + err.code);
		} else {
			console.log('DB Rows added: ' + result.affectedRows);
			res.send('User added successfully');
		}

	});

});

module.exports = router;