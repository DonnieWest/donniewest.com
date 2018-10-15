import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { rhythm } from '../utils/typography'

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
          <div
            style={{
              margin: '0 auto',
              maxWidth: rhythm(22),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {pageContext ? <h2>{pageContext.frontmatter.title}</h2> : null}
            {pageContext ? <small>{new Date(pageContext.frontmatter.date).toLocaleDateString()}</small> : null}
            {children}
          </div>
          <Footer />
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
