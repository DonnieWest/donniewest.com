import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

export default function Missing({ location }) {
  return (
    <Layout location={location}>
      <h2>Not Found</h2>
      <p>
        Sorry, we can't find that page :/ please check out the{' '}
        <Link to="/">home page</Link> to find it or some other articles
      </p>
    </Layout>
  )
}
