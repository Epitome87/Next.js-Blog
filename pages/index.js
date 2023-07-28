import Head from 'next/head';
import FeaturedPosts from '../components/Home/FeaturedPosts';
import Hero from '../components/Home/Hero';
import { getFeaturedPosts } from '../postsUtility';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Matthews Next.js Blog</title>
        <meta name='description' content='Where Matthew blogs about web development!' />
      </Head>

      <main>
        <Hero />
        <FeaturedPosts posts={posts} />
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  // TODO: Fetch posts from a database
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
}
