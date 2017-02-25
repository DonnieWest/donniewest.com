import React from 'react'
import dateFormatter from '../../utils/dateFormatter'
import './Post.css'

export default ({ post }) => (
  <div>
    <div className='article-entry'>
      <h1 className='article-title'>{post.title}</h1>
      <p className='date'>{dateFormatter(new Date(post.date))}</p>
      <p className='article-read-time'>
        {`${Math.ceil(post.content.split(' ').length / 200)} minutes to read`}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  </div>
)
