import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactDOM from 'react-dom'
console.table(ReactDOM)
import styled, { injectGlobal, haf, metrics, mq, type } from '../styles'

injectGlobal`
  ${require('./reset.css')}

  :root {
    font-family: cresta, guanabara-sans, Helvetica, sans-serif;
    font-size: 18px;

    ${mq.medium`
      font-size: 20px;
    `}

    ${mq.large`
      font-size: 22px;
    `}
  }
`

const Header = () => (
  <StyledHeader>
    <Wrapper>
      <h1>
        <Link to="/">Gatsby</Link>
      </h1>
    </Wrapper>
  </StyledHeader>
)

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
      link={[
        { rel: 'stylesheet', href: 'https://use.typekit.net/han5mfo.css' }
      ]}
    />
    <Header />
    <SiteContent>
      {children()}
    </SiteContent>
  </Fragment>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

const StyledHeader = styled.header`
  background-color: red;
  color: white;
  content: '${metrics.baseSpacing}';

  h1 {
    ${type(1)}
  }

  a {
    display: inline-block;
    color: white;
    border-bottom: 2px solid transparent;
    text-decoration: none;

    ${haf`
      color: white;
      border-bottom-color: currentColor;
    `}
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${metrics.maxWidth};
  padding: ${metrics.baseSpacing};
`
const SiteContent = Wrapper.extend`
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${metrics.baseSpacing};
    font-family: gastromond, Palatino, serif;
  }

  h1 {
    ${type(3)}
  }

  h2 {
    ${type(2)}
  }

  h3 {
    ${type(1)}
  }

  h4 {
    ${type(1)}
  }

  p {
    margin: 0 0 ${metrics.baseSpacing};
    line-height: 1.5;
  }
`
