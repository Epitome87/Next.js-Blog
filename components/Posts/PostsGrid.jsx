import React from 'react';
import PostItem from './PostItem';
import styles from './PostsGrid.module.css';

function PostsGrid({ posts }) {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <li key={posts.slug}>
          <PostItem post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostsGrid;
