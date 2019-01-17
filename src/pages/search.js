import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import Layout from '../components/layout'
import styled from '@emotion/styled'

const Search = styled.input`
  font-size: ${scale(1).fontSize};
  line-height: 1em;
  background-size: 1.5em;
  border: none;
  margin-bottom: ${rhythm(1)};
`

export default class SearchPage extends Component {
  state = {
    filter: '',
  }

  render() {
    const { data, location } = this.props
    const { filter } = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Layout location={location}>
          <Search
            autoFocus
            placeHolder="Search"
            value={filter}
            onChange={event => {
              this.setState({ filter: event.target.value })
            }}
          />
          {filter &&
            data.allMdx.edges
              .filter(({ node }) => {
                return (
                  JSON.stringify(node)
                    .toLowerCase()
                    .indexOf(filter.toLowerCase()) > -1
                )
              })
              .map(
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
                      <small>{node.frontmatter.date}</small>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.excerpt,
                        }}
                      />
                    </div>
                  ),
              )}
        </Layout>
      </div>
    )
  }
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
          }
        }
      }
    }
  }
`
