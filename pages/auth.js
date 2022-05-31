import React from 'react';
import Head from 'next/head';
import AuthForm from '../components/Auth/AuthForm';

function Auth() {
  return (
    <>
      <Head>
        <title>Sign-In / Register</title>
        <meta name='description' content="Sign-In or Register for Matthew's Blog!" />
      </Head>
      <AuthForm />
    </>
  );
}

export default Auth;
