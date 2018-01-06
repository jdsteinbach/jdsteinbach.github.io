import { css } from 'styled-components'
import mq from './mq'

const _scales = {
  default: 1.25,
  medium: 1.33,
  large: 1.414,
}

const _size = (size, mq) => `font-size: ${Math.pow(_scales[mq], size)}rem;`

export default (size) => {
  return css`
    ${_size(size, 'default')}

    ${mq.medium`
      ${_size(size, 'medium')}
    `}

    ${mq.large`
      ${_size(size, 'large')}
    `}
  `
}
