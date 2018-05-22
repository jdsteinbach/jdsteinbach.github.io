/*!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
const loadCSS = ( href, before, media, callback ) => {
  'use strict'
  var ss = window.document.createElement( 'link' )
  var ref = before || window.document.getElementsByTagName( 'script' )[ 0 ]
  var sheets = window.document.styleSheets
  ss.rel = 'stylesheet'
  ss.href = href
  ss.media = 'only x'
  if( callback ) {
    ss.onload = callback
  }

  ref.parentNode.insertBefore( ss, ref )
  ss.onloadcssdefined = cb => {
    var defined
    for( var i = 0; i < sheets.length; i++ ) {
      if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
        defined = true
      }
    }
    if( defined ){
      cb()
    }
    else {
      setTimeout(() => {
        ss.onloadcssdefined( cb )
      })
    }
  }
  ss.onloadcssdefined(() => {
    ss.media = media || 'all'
  })
  return ss
}

// loadCSS( "/css/main.css" )

// Control form fields
const form_boxes =  document.querySelectorAll('.mc-field-group, .field-group')

const activate_field = el => el.parentNode.classList.add('active-input')

const deactivate_field = el => {
  if ( el.value === '' ) {
    el.parentNode.classList.remove('active-input')
  }
}

for ( let box of form_boxes ) {
  let form_input = box.querySelector('textarea, input')

  deactivate_field(form_input)

  form_input.addEventListener('focus', e => activate_field(e.target))
  form_input.addEventListener('change', e => activate_field(e.target))
  form_input.addEventListener('blur', e => deactivate_field(e.target))
}


// Ajax Form Submission
const ajaxForm = ({id, responseID, fieldIDs, successMsg, failMsg}) => {
  const contactForm = document.getElementById(id)

  if ( contactForm !== null && window.fetch !== undefined ) {
    let formMessage = document.getElementById(responseID)

    contactForm.addEventListener('submit', e => {
      let data = new FormData(contactForm)

      e.preventDefault()

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
            for ( let id of fieldIDs) {
              document.getElementById(id).value = ''
            }

            formMessage.textContent = successMsg
          } else {
            formMessage.textContent = failMsg
          }
        }
      )
      .catch(
        function(err) {
          formMessage.textContent = failMsg
        }
      )
    })
  }
}

ajaxForm({
  id: 'contact-form',
  responseID: 'form-message',
  fieldIDs: ['name', 'email', 'message'],
  successMsg: 'Thanks, your message has been sent.',
  failMsg: 'Sorry, an error occured and your message could not be sent.'
})

ajaxForm({
  id: 'mc-embedded-subscribe-form',
  responseID: 'mc_embedded_signup',
  fieldIDs: [],
  successMsg: 'Thanks, check your inbox to confirm your subscription!',
  failMsg: 'Sorry, an error occured and you weren’t subscribed. Please try again later.'
})

if (window.localStorage) {
  const main   = document.getElementById('main')
  const toggle = document.createElement('button')

  const saveTheme = (isDark) => {
    let theme = isDark ? 'dark' : ''
    localStorage.setItem('theme', theme)
  }

  const setTheme = (isDark) => {
    isDark = isDark || getTheme()
    buttonText(isDark)
    saveTheme(isDark)
  }

  const getTheme = () => document.body.classList.contains('theme-dark')

  const buttonText = (isDark) => {
    toggle.innerHTML = isDark ? 'Light Theme' : 'Dark Theme'
  }

  buttonText(getTheme())

  toggle.classList.add('button-theme')

  toggle.addEventListener('click', e => {
    e.preventDefault()
    document.body.classList.toggle('theme-dark')
    setTheme()
  })

  main.parentNode.insertBefore(toggle, main)
}

console.log([
  '',
  '               ///  /////////     /////////',
  '              ///  ///    ///   ///     ///',
  '             ///  ///     ///  ///     ///',
  '            ///  ///     ///  ///',
  '           ///  ///     ///   ///',
  '          ///  ///     ///      ///',
  '         ///  ///     ///         ///',
  '        ///  ///     ///          ///',
  '///    ///  ///     ///  ///     ///',
  '///  ///   ///    ///   ///     ///',
  ' /////    /////////      ////////',
  ''
].join('\n'))
