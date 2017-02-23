import React from 'react'
import { Link } from 'react-router-dom'
import './Archive.css'

export default ({ posts }) => (
  <div>
    <h1>Posts:</h1>
    <ul className='article-archive'>
      {posts.map(post => {
        return (
          <li>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        )
      })}
    </ul>
  </div>
)
