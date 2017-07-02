import React from 'react';
import dateFormatter from '../../utils/dateFormatter';
import { ScrollIntoView } from 'rrc';
import './Post.css';

export default ({ post, jumpTo }) => {
  const jumpToHash = jumpTo || '#title';
  return (
    <div>
      <ScrollIntoView id={jumpToHash} />
      <div className="article-entry">
        <h1 className="article-title" id="title">
          {post.title}
        </h1>
        <p className="date">
          {dateFormatter(new Date(post.date))}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};
