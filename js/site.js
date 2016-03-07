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
(function($) {
  var $form_boxes  = $('.mc-field-group, .field-group'),
      $form_inputs = $form_boxes.find('textarea, input');

  $form_inputs.each(function() {
    $li = $(this).closest($form_boxes);
    if ( $(this)[0].value === '' ) {
      $li.removeClass('active-input');
    }
  });

  $form_inputs.on('change focus', function() {
    $li = $(this).closest($form_boxes);
    $li.addClass('active-input');
  });

  $form_inputs.on('blur', function() {
    $li = $(this).closest($form_boxes);
    if ( $(this)[0].value === '' ) {
      $li.removeClass('active-input');
    }
  });
})(jQuery);

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
        $fm.removeClass('error').addClass('success').html(response);
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        $fm.removeClass('success').addClass('error');
        if (data.responseText !== '') {
          $fm.html(data.responseText);
        } else {
          $fm.html('<p>Sorry, an error occured and your message could not be sent.</p>');
        }
      });
    });
  }
})(jQuery);