(function( $ ) {
	var selected_field;
	var open_triggered = false;
	var pickerCreated = false;
  $.fn.tt4TimePicker = function() {
	  	if (!  pickerCreated )
	  	{
	  		pickerCreated = true;
	  		$('body').append(buildPickerPanel());
	  	}

		// event handler for timepick textbox
		this.click(function() {
			open_triggered = true;
			selected_field = $(this);
		 	var panel = $('#util_timepicker_panel');
		 	var pos = $(this).offset();
		 	pos.top = pos.top - panel.height();
		 	pos.left = pos.left -50 ;
		 	
		 	if (pos.top < 0) {	//problems displaying:
		 		pos.top = 0;
		 		pos.left = pos.left + 50 + $(this).width();
		 	}
		 	
		 	// select <li> witch matches selected value
		 	$('#util_timepicker_panel ul ul li').attr('class','');
		 	if ($(this).attr('value')) {
		 		$('#util_timepicker_panel ul ul li:contains('+$(this).attr('value')+')').first().attr('class','selected');
		 	}

		 	$('#util_timepicker_panel').show(); // show first, otherwise messes up pos calc.
		 	panel.offset(pos);
		});
		
		// unfocus textbos
		this.blur(function() {
			open_triggered = false;
			setTimeout( 
				function() {
					if ( ! open_triggered )
					{
						$('#util_timepicker_panel').hide()
					}
				} ,
				150
			);
		});
		
		// event handler timepicker, picked time
		$('#util_timepicker_panel ul li ul li').click(function() {
			if (typeof selected_field !== 'undefined')
			{
				selected_field.attr('value',$(this).html());
				$('#util_timepicker_panel').hide();
				selected_field.trigger('change');
			}
		});
		
  };
  
  function buildPickerPanel() {
	  	// build timepicker
	  	var div = $('<div>');
		div.attr('id','util_timepicker_panel');
		var ul1;
		var ul;
		ul1 = $('<ul>').attr('class','f1');
		for ( var i=0; i<12; i++)
		{
			ul = $('<ul>').attr('class','f2');
			ul.append($('<li>').html(i + ':00'));
			ul.append($('<li>').html(i + ':15'));
			ul.append($('<li>').html(i + ':30'));
			ul.append($('<li>').html(i + ':45'));
			ul1.append($('<li>').append(ul));
		}
		div.append(ul1);
		ul1 = $('<ul>').attr('class','f1');
		for ( var i=12; i<24; i++)
		{
			ul = $('<ul>').attr('class','f2');
			ul.append($('<li>').html(i + ':00'));
			ul.append($('<li>').html(i + ':15'));
			ul.append($('<li>').html(i + ':30'));
			ul.append($('<li>').html(i + ':45'));
			ul1.append($('<li>').append(ul));
		}
		div.append(ul1);
		return div;
  }
})( jQuery );