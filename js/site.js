/*!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
function loadCSS( href, before, media, callback ){
	'use strict';
	var ss = window.document.createElement( 'link' );
	var ref = before || window.document.getElementsByTagName( 'script' )[ 0 ];
	var sheets = window.document.styleSheets;
	ss.rel = 'stylesheet';
	ss.href = href;
	ss.media = 'only x';
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
		ss.media = media || 'all';
	});
	return ss;
}

// loadCSS( "/css/main.css" );

// Control form fields
var form_boxes =  document.querySelectorAll('.mc-field-group, .field-group');

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


// Ajax Form Submission
(function() {
  var contactForm = document.getElementById('contact-form');

  if ( contactForm !== null && window.fetch !== undefined ) {
    var formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
      var data = new FormData(contactForm);

      e.preventDefault();

      fetch(
        contactForm.getAttribute('action'),
        {
          method: contactForm.getAttribute('method'),
          body: data
        }
      )
      .then(
        function(response) {
          if ( response.status < 400 ) {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';

            formMessage.textContent = 'Thanks, your message has been sent.';
          } else {
            formMessage.textContent = 'Sorry, an error occured and your message could not be sent.';
          }
        }
      )
      .catch(
        function(err) {
          formMessage.textContent = 'Sorry, an error occured and your message could not be sent.';
        }
      );
    })
  }
})();

(function() {
  var contactForm = document.getElementById('mc-embedded-subscribe-form');

  if ( contactForm.length > 0 && window.fetch !== undefined ) {
    var formMessage = document.getElementById('mc_embed_signup');

    contactForm.addEventListener('submit', function(e) {
      var data = new FormData(contactForm);

      e.preventDefault();

      fetch(
        contactForm.getAttribute('action'),
        {
          method: contactForm.getAttribute('method'),
          mode: 'no-cors',
          body: data
        }
      )
      .then(
        function(response) {
          if ( response.status < 400 ) {
            formMessage.innerHTML = '<p>Thanks, check your inbox to confirm your subscription!</p>';
          } else {
            formMessage.innerHTML = '<p>Sorry, an error occured and your message could not be sent.</p>';
          }
        }
      )
      .catch(
        function(err) {
          formMessage.innerHTML = '<p>Sorry, an error occured and your message could not be sent.</p>';
        }
      );
    })
  }
})();

(function() {
  if ( window.localStorage ) {
    var main   = document.getElementById('main');
    var toggle = document.createElement('button');

    function saveTheme(isDark) {
      var theme = isDark ? 'dark' : '';
      localStorage.setItem('theme', theme);
    }

    function setTheme(isDark) {
      var isDark = isDark ? isDark : getTheme();
      buttonText(isDark);
      saveTheme(isDark);
    }

    function getTheme() {
      return document.body.classList.contains('theme-dark');
    }

    function buttonText(isDark) {
      toggle.innerHTML = isDark ? 'Light Theme' : 'Dark Theme';
    }

    buttonText(getTheme());

    toggle.classList.add('button-theme');

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.toggle('theme-dark');
      setTheme();
    });

    main.parentNode.insertBefore(toggle, main);
  }
})();