import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { rhythm } from '../utils/typography'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: ${rhythm(28)};
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  p > code[class*='language-'] {
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

  table {
    display: inline-block;
    overflow-y: auto;
  }

  br {
    margin-bottom: ${rhythm(1)};
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
          css={css`
            height: 100vh;
            display: flex;
            flex-direction: column;
          `}
        >
          <Helmet title={data.site.siteMetadata.title}>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="author" content="Donnie West" />
            <link
              rel="pingback"
              href="https://webmention.io/donniewest.com/xmlrpc"
            />
            <link
              rel="webmention"
              href="https://webmention.io/donniewest.com/webmention"
            />
            <link rel="canonical" href="https://donniewest.com" />
          </Helmet>
          <Header title={data.site.siteMetadata.title} />
          <PageWrapper>
            {pageContext ? <h1>{pageContext.frontmatter.title}</h1> : null}
            {pageContext ? (
              <small>
                {new Date(pageContext.frontmatter.date).toLocaleDateString()}
              </small>
            ) : null}
            <br />
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
