var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

// GET Index and Display DB Select * Query
router.get('/', function(req, res) {

	var conn = req.app.get('appDB');

	conn.query('SELECT * FROM user', function(err, result){
		if (err) {
			console.log('Error: ' + err.code);
			var getError = err;
			var getResult = '';
		} else {
			console.log('Result:' + JSON.stringify(result));
			var getResult = result;
			var getError = '';	
		}

		res.render('index', {
			pageID: 'index',
			getError: getError,
			getResult: getResult,
			updateError: '',
			updateResult: ''
		});
	});
});

// DELETE Row
router.delete('/delete/:id', function(req, res){

	var conn = req.app.get('appDB');

	conn.query('DELETE FROM user WHERE userId= ?', req.params.id, function(err, result){

		if (err) {
			console.log('Error: ' + err.code);
			res.send("Error: " + err.code);
		} else {
			console.log('DB Rows Added: ' + result.affectedRows)
			res.send(result.affectedRows + ' Row Deleted Successfully');	
		}

	});

});

// UPDATE Row
router.put('/save/:id', function(req, res) {

	var conn = req.app.get('appDB');

	conn.query('UPDATE user SET firstName = ?, lastName = ?, email = ? WHERE userId = ?', [req.body.firstName, req.body.lastName, req.body.email, req.params.id], function(err, result){
		
		if (err) {
			console.log('Error: ' + err.code);
			res.send("Error: " + err.code);
		} else {
			console.log('DB Rows Updated: ' + result.affectedRows)
			res.send(result.affectedRows + ' Row Updated Successfully');	
		}

	});

});

module.exports = router;

