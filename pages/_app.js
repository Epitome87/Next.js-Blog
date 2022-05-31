import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Where Matthew blogs about web development!' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
