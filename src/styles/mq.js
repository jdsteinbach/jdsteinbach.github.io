import { css } from 'styled-components'

const sizes = {
  medium: 600,
  large: 960,
  xlarge: 1280
}

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})
