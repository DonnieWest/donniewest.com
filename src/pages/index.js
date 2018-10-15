import React from 'react'
import { graphql, Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'

export default function IndexPage({ data, location }) {
  return (
    <Layout location={location}>
      {data.allMdx.edges.map(
        ({ node }) =>
          !node.frontmatter.draft && (
            <div key={node.id}>
              <h4
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={`/${node.parent.name}/`}>
                  {node.frontmatter.title || node.parent.name}
                </Link>
              </h4>
              <small>
                {new Date(node.frontmatter.date).toLocaleDateString()}
              </small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          ),
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          parent {
            ... on File {
              name
              absolutePath
              relativePath
            }
          }
          timeToRead
          frontmatter {
            title
            draft
            date
          }
        }
      }
    }
  }
`
