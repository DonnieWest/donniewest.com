import React from 'react';
import dateFormatter from '../../utils/dateFormatter';
import { ScrollIntoView } from 'rrc';
import './Post.css';

export default ({ post }) => (
  <div>
    <ScrollIntoView id="#title" />
    <div className="article-entry">
      <h1 className="article-title" id="title">{post.title}</h1>
      <p className="date">{dateFormatter(new Date(post.date))}</p>
      <p className="article-read-time">
        {`${Math.ceil(post.content.split(' ').length / 200)} minutes to read`}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  </div>
);
