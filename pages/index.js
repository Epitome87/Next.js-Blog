import Head from 'next/head';
import FeaturedPosts from '../components/Home/FeaturedPosts';
import Hero from '../components/Home/Hero';
import MOCK_POSTS from '../mockPosts';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Matthew's Next.js Blog</title>
        <meta name='description' content='Where Matthew blogs about web development!' />
        <link rel='icon' href='/favicon.ico' />
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
  return {
    props: {
      posts: MOCK_POSTS,
    },
  };
}
