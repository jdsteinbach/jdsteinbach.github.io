/*!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
function loadCSS( href, before, media, callback ){
	"use strict";
	var ss = window.document.createElement( "link" );
	var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
	var sheets = window.document.styleSheets;
	ss.rel = "stylesheet";
	ss.href = href;
	ss.media = "only x";
	if( callback ) {
		ss.onload = callback;
	}

	ref.parentNode.insertBefore( ss, ref );
	ss.onloadcssdefined = function( cb ){
		var defined;
		for( var i = 0; i < sheets.length; i++ ){
			if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
				defined = true;
			}
		}
		if( defined ){
			cb();
		}
		else {
			setTimeout(function() {
				ss.onloadcssdefined( cb );
			});
		}
	};
	ss.onloadcssdefined(function() {
		ss.media = media || "all";
	});
	return ss;
}

// loadCSS( "/css/main.css" );

// Control form fields
var form_boxes =  document.querySelectorAll('.mc-field-group, .field-group');
// var form_inputs = form_boxes.querySelector('textarea, input');

function activate_field(el) {
  el.parentNode.classList.add('active-input');
}

function deactivate_field(el) {
  if ( el.value === '' ) {
    el.parentNode.classList.remove('active-input');
  }
}

Array.prototype.forEach.call(form_boxes, function(el, i){
  var form_input = el.querySelector('textarea, input');

  deactivate_field(form_input);

  form_input.addEventListener('focus', function(event) {
    activate_field(event.target);
  });
  form_input.addEventListener('change', function(event) {
    activate_field(event.target);
  });
  form_input.addEventListener('blur', function(event) {
    deactivate_field(event.target);
  });
});

(function($) {
  var $cf = $('#contact-form'),
      $fm = $('.form-message');

  if ( $cf.length > 0 ) {
    $cf.submit(function(e){
      e.preventDefault();

      var form_data = $cf.serialize();

      $.ajax({
        type: 'POST',
        url: $cf.attr('action'),
        data: form_data
      })
      .done(function(response) {
        $fm.removeClass('error').addClass('success');
        $fm.html('Thanks, your message has been sent.');
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        $fm.removeClass('success').addClass('error');
        if (data.responseText !== '') {
          $fm.html(data.responseText);
        } else {
          $fm.html('Sorry, an error occured and your message could not be sent.');
        }
      });
    });
  }
})(jQuery);