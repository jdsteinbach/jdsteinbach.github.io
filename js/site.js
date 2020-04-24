'use strict';

// Let the DOM know the browser has JS
document.body.classList.add('js');

// Control form fields
var formBoxes = document.querySelectorAll('.form__field');

var activateField = function activateField(el) {
  return el.parentNode.classList.add('is-active');
};

var deactivateField = function deactivateField(el) {
  if (el.value === '') {
    el.parentNode.classList.remove('is-active');
  }
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = formBoxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var box = _step.value;

    var formInput = box.querySelector('textarea, input');

    deactivateField(formInput);

    formInput.addEventListener('focus', function (e) {
      return activateField(e.target);
    });
    formInput.addEventListener('change', function (e) {
      return activateField(e.target);
    });
    formInput.addEventListener('blur', function (e) {
      return deactivateField(e.target);
    });
  }

  // Fetch-based Form Submission
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var fetchForm = function fetchForm(_ref) {
  var id = _ref.id,
      responseID = _ref.responseID,
      fieldIDs = _ref.fieldIDs,
      successMsg = _ref.successMsg,
      failMsg = _ref.failMsg;

  var contactForm = document.getElementById(id);

  if (contactForm !== null && window.fetch !== undefined) {
    var formMessage = document.getElementById(responseID);

    contactForm.addEventListener('submit', function (e) {
      var data = new FormData(contactForm);

      e.preventDefault();

      if (data.has('web') > -1 && data.get('web') !== '') {
        formMessage.innerHTML = failMsg;
        return false;
      }

      fetch(contactForm.getAttribute('action'), {
        method: contactForm.getAttribute('method'),
        body: data
      }).then(function (response) {
        if (response.status < 400) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = fieldIDs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _id = _step2.value;

              document.getElementById(_id).value = '';
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          formMessage.innerHTML = '<p class="form__response-message is-success">' + successMsg + '</p>';
        } else {
          formMessage.innerHTML = '<p class="form__response-message is-error">' + failMsg + '</p>';
        }
      }).catch(function (err) {
        console.log(err);
        formMessage.innerHTML = '<p class="form__response-message is-error">' + failMsg + '</p>';
      });
    });
  }
};

fetchForm({
  id: 'contact-form',
  responseID: 'form-message',
  fieldIDs: ['name', 'email', 'message'],
  successMsg: 'Thanks, your message has been sent.',
  failMsg: 'Sorry, an error occurred and your message could not be sent.'
});

fetchForm({
  id: 'mc-embedded-subscribe-form',
  responseID: 'mc_embed_signup_scroll',
  fieldIDs: [],
  successMsg: 'Thanks, check your inbox to confirm your subscription!',
  failMsg: 'Sorry, an error occurred and you weren’t subscribed. <a class="button" href="https://jamessteinbach.us7.list-manage.com/subscribe/post?u=e06400c5106eb26339f4a0aea&id=35bef0e04e" target="_blank" rel="noopener noreferrer nofollow">Try subscribing here</a>'
});

if ('localStorage' in window) {
  var container = document.getElementById('header-nav');
  var toggle = document.createElement('button');
  toggle.setAttribute('type', 'button');

  var saveTheme = function saveTheme(isDark) {
    var theme = isDark ? 'dark' : '';
    window.localStorage.setItem('theme', theme);
  };

  var setTheme = function setTheme(isDark) {
    isDark = isDark || getTheme();
    buttonText(isDark);
    saveTheme(isDark);
  };

  var getTheme = function getTheme() {
    return document.body.classList.contains('theme-dark');
  };

  var buttonText = function buttonText(isDark) {
    toggle.innerHTML = isDark ? 'Light Theme' : 'Dark Theme';
  };

  buttonText(getTheme());

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('theme-dark');
    setTheme();
  });

  toggle.classList.add('toggle');

  container.appendChild(toggle);
}

var toc = document.querySelector('.post-toc');

if (toc) {
  toc.setAttribute('aria-hidden', true);
  var title = toc.querySelector('.post-toc__title');

  if (title) {
    title.addEventListener('click', function (e) {
      if (toc.getAttribute('aria-hidden') === 'true') {
        toc.setAttribute('aria-hidden', false);
      } else {
        toc.setAttribute('aria-hidden', true);
      }
    });
  }
}

console.log(['', '               ///  /////////     /////////', '              ///  ///    ///   ///     ///', '             ///  ///     ///  ///     ///', '            ///  ///     ///  ///', '           ///  ///     ///   ///', '          ///  ///     ///      ///', '         ///  ///     ///         ///', '        ///  ///     ///          ///', '///    ///  ///     ///  ///     ///', '///  ///   ///    ///   ///     ///', ' /////    /////////      ////////', ''].join('\n'));