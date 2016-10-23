$(function (){

	// AJAX Delete Table Row
	$('button[name=delete]').on('click', function(e) {
		$.ajax({
          url: '/delete/' + e.target.id,
          type: 'DELETE',
          success: updateSuccess,
          error: updateError
        }); 
	});

	// AJAX Save Table Row Edits
	$('button[name=save]').on('click', function(e) {
		$.ajax({
          url: '/save/' + e.target.id,
          data: {
          	userId: e.target.id,
          	firstName: $('input[name=firstName][id='+ e.target.id +']').val(),
          	lastName: $('input[name=lastName][id='+ e.target.id +']').val(),
          	email: $('input[name=email][id='+ e.target.id +']').val()
          },
          type: 'PUT',
          success: updateSuccess,
          error: updateError
        }); 
	});

	// Edit Client-Side Table Row
	$('button[name=edit]').on('click', function(e) {
		// Grab input elements of the target row clicked
		var targetRow = $('input[id='+ e.target.id +']');
		// Grab Delete button of the target row clicked
		var targetDeleteBtn = $('button[name=delete][id='+ e.target.id +']');	
		// Save original row values prior to user edit
		var first = $('input[name=firstName][id='+ e.target.id +'][readonly!=readonly]').attr('value');
		var last = $('input[name=lastName][id='+ e.target.id +'][readonly!=readonly]').attr('value');
		var email = $('input[name=email][id='+ e.target.id +'][readonly!=readonly]').attr('value');
		
		// Remove readonly attribute to make row editable
		// Remove delete button while row is editable
		// Change edit icon to cancel icon
		if (targetRow.attr('readonly')) {
			targetRow.removeAttr('readonly');
			targetRow.parent().addClass('active');
			$(this).removeClass('glyphicon glyphicon-pencil');
			$(this).addClass('glyphicon glyphicon-remove-circle');
			targetDeleteBtn.css('display', 'none');
		} else {
		// Add back readonly attribute if user clears edits
		// Add back original input field values
		// Change cancel icon back to edit 
			$('input[name=firstName][id='+  e.target.id +']').val(first);
			$('input[name=lastName][id='+  e.target.id +']').val(last);
			$('input[name=email][id='+  e.target.id +']').val(email);
			targetRow.attr('readonly','readonly');
			targetRow.parent().removeClass('active');
			$(this).removeClass('glyphicon glyphicon-remove-circle');
			$(this).addClass('glyphicon glyphicon-pencil');
			targetDeleteBtn.css('display', 'inline');
			$('button[id='+ e.target.id +'][name=save]').css('display', 'none');
		}
		// Display save button if user makes edits to input elements
		targetRow.on('input', function(e) {
			$('button[id='+ e.target.id +'][name=save]').css('display', 'inline');
		});
	});

});

// AJAX success function
function updateSuccess(data) {
	console.log(data);
	$('#updateResult').text(data);
	setTimeout(function(){
		location.reload(true);
	}, 3000);
}

// AJAX error function
function updateError(data) {
	console.log('DB Update Error');
}
