import React from 'react';
import PostExcerpt from '../PostExcerpt';

export default ({ posts }) => (
  <div>
    {posts && posts.map(post => <PostExcerpt post={post} />)}
  </div>
);
