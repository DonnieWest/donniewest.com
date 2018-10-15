import React from 'react';
import PostExcerpt from '../PostExcerpt';

function getFilteredPosts(posts, filter) {
  if (filter && filter !== '') {
    return posts.filter(
      post =>
        post.content.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        post.title.toLowerCase().indexOf(filter.toLowerCase()) > -1,
    );
  }
  return posts;
}

export default ({ posts, filter }) => (
  <div>
    <h1>Search</h1>
    {getFilteredPosts(posts, filter).map(post => {
      return <PostExcerpt post={post} />;
    })}
    {getFilteredPosts(posts, filter).length === 0 ? <p>Nothing found</p> : null}
  </div>
);
