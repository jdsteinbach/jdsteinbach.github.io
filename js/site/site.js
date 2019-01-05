// Control form fields
const formBoxes = document.querySelectorAll('.mc-field-group, .field-group')

const activateField = el => el.parentNode.classList.add('active-input')

const deactivateField = el => {
  if (el.value === '') {
    el.parentNode.classList.remove('active-input')
  }
}

for (let box of formBoxes) {
  let formInput = box.querySelector('textarea, input')

  deactivateField(formInput)

  formInput.addEventListener('focus', e => activateField(e.target))
  formInput.addEventListener('change', e => activateField(e.target))
  formInput.addEventListener('blur', e => deactivateField(e.target))
}

// Ajax Form Submission
const ajaxForm = ({id, responseID, fieldIDs, successMsg, failMsg}) => {
  const contactForm = document.getElementById(id)

  if (contactForm !== null && window.fetch !== undefined) {
    let formMessage = document.getElementById(responseID)

    contactForm.addEventListener('submit', e => {
      let data = new FormData(contactForm)

      e.preventDefault()

      if (data.has('web') > -1 && data.get('web') !== '') {
        formMessage.innerHTML = failMsg
        return false
      }

      fetch(
        contactForm.getAttribute('action'),
        {
          method: contactForm.getAttribute('method'),
          body: data
        }
      )
        .then(
          function (response) {
            if (response.status < 400) {
              for (let id of fieldIDs) {
                document.getElementById(id).value = ''
              }

              formMessage.innerHTML = successMsg
            } else {
              formMessage.innerHTML = failMsg
            }
          }
        )
        .catch(
          function (err) {
            console.log(err)
            formMessage.innerHTML = failMsg
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
  failMsg: 'Sorry, an error occurred and your message could not be sent.'
})

ajaxForm({
  id: 'mc-embedded-subscribe-form',
  responseID: 'mc_embed_signup_scroll',
  fieldIDs: [],
  successMsg: '<p class="mc-response">Thanks, check your inbox to confirm your subscription!</p>',
  failMsg: '<p class="mc-response">Sorry, an error occurred and you weren’t subscribed. <a class="button" href="https://jamessteinbach.us7.list-manage.com/subscribe/post?u=e06400c5106eb26339f4a0aea&id=35bef0e04e" target="_blank" rel="noopener noreferrer nofollow">Try subscribing here</a></p>'
})

if ('localStorage' in window) {
  const container = document.getElementById('site-nav')
  const toggle = document.createElement('button')
  toggle.setAttribute('type', 'button')

  const saveTheme = (isDark) => {
    let theme = isDark ? 'dark' : ''
    window.localStorage.setItem('theme', theme)
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

  toggle.addEventListener('click', e => {
    e.preventDefault()
    document.body.classList.toggle('theme-dark')
    setTheme()
  })

  toggle.classList.add('toggle')

  container.appendChild(toggle)
}

const toc = document.querySelector('.post-toc')

if (toc) {
  toc.setAttribute('aria-hidden', true)
  const title = toc.querySelector('.post-toc__title')

  if (title) {
    title.addEventListener('click', e => {
      if (toc.getAttribute('aria-hidden') === 'true') {
        toc.setAttribute('aria-hidden', false)
      } else {
        toc.setAttribute('aria-hidden', true)
      }
    })
  }
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
