import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { rhythm } from '../utils/typography'
import style from 'react-emotion'

const PageWrapper = style.div`
  margin: 0 auto;
  max-width: ${rhythm(22)};
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  p > code[class*="language-"] {
    white-space: unset;
    border: none;
    background: inherit;
  }

  div > blockquote {
    font-style: italic;
    border-left: darkslategrey solid ${rhythm(1 / 4)};
    padding-left: ${rhythm(3 / 4)};
    margin-left: -${rhythm(3 / 4)};
  }
`

export default function Layout({ children, location, pageContext }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Helmet title={data.site.siteMetadata.title} meta={[]}>
            <html lang="en" />
          </Helmet>
          <Header title={data.site.siteMetadata.title} />
          <PageWrapper>
            {pageContext ? <h2>{pageContext.frontmatter.title}</h2> : null}
            {pageContext ? (
              <small>
                {new Date(pageContext.frontmatter.date).toLocaleDateString()}
              </small>
            ) : null}
            {children}
          </PageWrapper>
          <Footer />
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
