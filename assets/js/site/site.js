// Let the DOM know the browser has JS
document.body.classList.add('js')

// IO for header
let io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const opacity = 1 - (entry.intersectionRatio / 2).toFixed(2)
    document.body.style.setProperty('--header-opacity', opacity)
  })
}, {
  threshold: Array.apply(null, { length: 101 }).map((x, idx) => idx / 100)
})

io.observe(document.querySelector('.hero'))

// Control form fields
const formBoxes = document.querySelectorAll('.form__field')

const activateField = el => el.parentNode.classList.add('is-active')

const deactivateField = el => {
  if (el.value === '') {
    el.parentNode.classList.remove('is-active')
  }
}

for (let box of formBoxes) {
  let formInput = box.querySelector('textarea, input')

  deactivateField(formInput)

  formInput.addEventListener('focus', e => activateField(e.target))
  formInput.addEventListener('change', e => activateField(e.target))
  formInput.addEventListener('blur', e => deactivateField(e.target))
}

// Fetch-based Form Submission
const fetchForm = ({id, responseID, fieldIDs, successMsg, failMsg}) => {
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
        .then(response => {
          if (response.status < 400) {
            for (let id of fieldIDs) {
              document.getElementById(id).value = ''
            }

            formMessage.innerHTML = `<p class="form__response-message is-success">${successMsg}</p>`
          } else {
            formMessage.innerHTML = `<p class="form__response-message is-error">${failMsg}</p>`
          }
        })
        .catch(err => {
          console.log(err)
          formMessage.innerHTML = `<p class="form__response-message is-error">${failMsg}</p>`
        })
    })
  }
}

fetchForm({
  id: 'contact-form',
  responseID: 'form-message',
  fieldIDs: ['name', 'email', 'message'],
  successMsg: 'Thanks, your message has been sent.',
  failMsg: 'Sorry, an error occurred and your message could not be sent.'
})

fetchForm({
  id: 'mc-embedded-subscribe-form',
  responseID: 'mc_embed_signup_scroll',
  fieldIDs: [],
  successMsg: 'Thanks, check your inbox to confirm your subscription!',
  failMsg: '<p class="error error--mailchimp">Sorry, an error occurred and you weren’t subscribed.</p><a class="button error-button" href="https://jamessteinbach.us7.list-manage.com/subscribe/post?u=e06400c5106eb26339f4a0aea&id=35bef0e04e" target="_blank" rel="noopener noreferrer nofollow">Subscribe Here</a>'
})

const newsletter_archive = document.getElementById('newsletter-archive')

if (newsletter_archive) {
  fetch(
    'https://api.jdsteinbach.com/newsletter/',
    { method: 'GET' }
  )
    .then(response => response.json())
    .then(data => {
      newsletter_archive.innerHTML = `<ul>${data}</ul>`
    })
    .catch(err => {
      console.log(err)
      newsletter_archive.innerHTML = 'Error: unable to load archive.'
    })
}

// `false === true` - temp deactivated until
// I can redesign the toggle with light/dark/auto
if ('localStorage' in window) {
  const toggles = document.querySelectorAll('input[name="theme"]')

  const initTheme = () => {
    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      Array.from(toggles).find(t => t.value === savedTheme).checked = true
    }
  }

  const getActiveTheme = () => {
    return Array.from(toggles).find(t => t.checked).value
  }

  const setTheme = theme => {
    window.localStorage.setItem('theme', theme)
    document.body.dataset.theme = theme
  }

  toggles.forEach(t => t.addEventListener('change', e => {
    e.preventDefault()
    setTheme(getActiveTheme())
  }))

  window.onload = initTheme
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

const headerMenuToggle = document.getElementById('header-menu-toggle')
const headerMenu = document.getElementById('header-menu')

if (headerMenuToggle && headerMenu) {
  headerMenuToggle.addEventListener('click', () => {
    headerMenu.classList.toggle('is-visible')
  })
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