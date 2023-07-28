import React from 'react';
import Head from 'next/head';
import AllPosts from '../../components/Posts/AllPosts';
import { getAllPosts } from '../../postsUtility';

function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Matthews Posts</title>
        <meta name='description' content='A list of all my posts' />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

export default Posts;

export async function getStaticProps(context) {
  // TODO: Fetch posts from a database
  return {
    props: {
      posts: getAllPosts(),
    },
    revalidate: 1800,
  };
}
