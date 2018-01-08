import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Link from 'gatsby-link';

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;
  return (
    <Fragment>
      <Helmet
        title={`Gatsby Blog - ${post.frontmatter.title}`}
        meta={[
          { name: 'description', content: post.excerpt }
        ]} />
      <header>
        <h1 className="title">
          {post.frontmatter.title}
        </h1>
        <time dateTime="post.frontmatter.date" className="date">
          {post.frontmatter.date}
        </time>
      </header>
      <main
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <nav className="navigation">
        {prev &&
          <Link className="link prev" to={prev.frontmatter.path}>{prev.frontmatter.title}</Link>}
        {next &&
          <Link className="link next" to={next.frontmatter.path}>{next.frontmatter.title}</Link>}
      </nav>
    </Fragment>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
