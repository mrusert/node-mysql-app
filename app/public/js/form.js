$(function() {
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
          url: '/adduser',
          type: 'POST',
          data: 'firstName='+ $('input[id=firstName]').val() 
          + '&lastName='+ $('input[id=lastName]').val() 
          + '&email='+ $('input[id=email]').val(),
          success: addSuccess,
          error: addError
        }); 
	});
});

function addSuccess(data) {
	console.log(data);
	$('#addResult').text(data);
	setTimeout(function(){
		location.reload(true);
	}, 3000);
	
}

function addError() {
	console.log('Error adding user');
	$('#addResult').text('Error adding user');
}