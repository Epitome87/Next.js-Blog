import React from 'react';
import Head from 'next/head';
import PostContent from '../../components/Posts/PostDetail/PostContent';
import { getPostData, getPostsFiles } from '../../postsUtility';

function PostDetails({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export default PostDetails;

export async function getStaticProps(context) {
  const { postSlug } = context.params;

  return {
    props: {
      post: getPostData(postSlug),
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { postSlug: slug } })),
    fallback: false,
  };
}
