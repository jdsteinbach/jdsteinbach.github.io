/*
 * Let the DOM know the browser has JS
 */
document.body.classList.add('js')


/*
 * IntersectionObserver for Header Opacity
 */
let io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const opacity = 1 - (entry.intersectionRatio / 2).toFixed(2)
    document.body.style.setProperty('--header-opacity', opacity)
  })
}, {
  threshold: Array.apply(null, { length: 101 }).map((x, idx) => idx / 100)
})

io.observe(document.querySelector('.hero'))


/*
 * Fetch-based Form Submission
 */
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
  failMsg: '<p class="error error--mailchimp">Sorry, an error occurred and you weren’t subscribed.</p><a class="error__link" href="https://jamessteinbach.us7.list-manage.com/subscribe/post?u=e06400c5106eb26339f4a0aea&id=35bef0e04e" target="_blank" rel="noopener noreferrer nofollow">Subscribe Here Instead</a>'
})


/*
 * Color Theme Toggle
 */
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


/*
 * Visibility Toggle
 */
const visibilityToggle = (toggle, externalClick, escapeKey, focusLeaves) => {
  externalClick = externalClick || false
  escapeKey = escapeKey || false
  focusLeaves = focusLeaves || false

  const widget = toggle
    ? document.getElementById(toggle.getAttribute('aria-controls'))
    : false

  if (widget) {
    const open = () => {
      toggle.setAttribute('aria-expanded', 'true')
      widget.removeAttribute('aria-hidden')
    }
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false')
      widget.setAttribute('aria-hidden', 'true')
    }

    toggle.addEventListener('click', e => {
      if (widget.getAttribute('aria-hidden') === 'true') {
        open()
      } else {
        close()
      }
    })

    // Close when focus leaves widget
    const focusableEls = widget.querySelectorAll('a, button, input, textarea, select')

    const lastFocusableEl = focusableEls[focusableEls.length - 1]

    const widgetHasFocusedLink = nextLink => {
      return Array.from(focusableEls).filter(link => {
        return link === nextLink
      }).length
    }

    if (focusLeaves && lastFocusableEl) {
      lastFocusableEl.addEventListener('blur', e => {
        if (!widgetHasFocusedLink(e.relatedTarget)) {
          close()
        }
      })
    }

    // Close on Escape key
    document.addEventListener('keyup', e => {
      if (
        escapeKey &&
        "keyCode" in e &&
        e.keyCode === 27 &&
        widget.getAttribute('aria-hidden') !== 'true'
      ) {
        close()
      }
    })

    // Close on click outside of widget
    document.addEventListener('click', e => {
      if (
        externalClick &&
        e.target !== toggle &&
        !widget.contains(e.target) &&
        widget.getAttribute('aria-hidden') !== 'true'
      ) {
        e.preventDefault()
        close()
      }
    })
  }
}

visibilityToggle(
  document.getElementById('toc-toggle'),
  true,
  true,
  true
)

visibilityToggle(
  document.getElementById('header-menu-toggle')
)


/*
 * Header Menu Responsive Override
 */
const menu = document.getElementById('header-menu')

if (menu) {
  const headerMQ = window.matchMedia('(min-width: 50em)')

  const headerToggle = mq => {
    if (mq.matches) {
      menu.removeAttribute('aria-hidden')
    } else {
      menu.setAttribute('aria-hidden', 'true')
    }
  }

  headerToggle(headerMQ)

  headerMQ.addListener(headerToggle)
}


/*
 * Just for Fun
 */
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
