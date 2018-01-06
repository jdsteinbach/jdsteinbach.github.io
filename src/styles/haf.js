import { css } from 'styled-components'

export default (...args) => {
  return css`
    &:hover,
    &:active,
    &:focus {
      ${css(...args)}
    }
  `
}
