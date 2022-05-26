import React from 'react';
import AllPosts from '../../components/Posts/AllPosts';
import { getAllPosts } from '../../postsUtility';

function Posts({ posts }) {
  return <AllPosts posts={posts} />;
}

export default Posts;

export async function getStaticProps(context) {
  // TODO: Fetch posts from a database
  return {
    props: {
      posts: getAllPosts()
    },
    revalidate: 1800,
  };
}
