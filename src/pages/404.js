import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

export default function Missing({ location }) {
  return (
    <Layout location={location}>
      <h2>Not Found</h2>
      <p>That page is missing, please check out the <Link to="/">home page</Link> for the article you're missing</p>
    </Layout>
  )
}
