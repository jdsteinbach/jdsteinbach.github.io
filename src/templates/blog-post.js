import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

const BlogPost = ({ data }) => {
  const { markdownRemark: post }

  return (
    <div>
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <header>
        <h1>{post.frontmatter.title}</h1>
      </header>
      <main className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default BlogPost

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
`
