import React from 'react';
import Head from 'next/dist/shared/lib/head';
import ContactForm from '../components/Contact/ContactForm';

function Contact() {
  return (
    <>
      <Head>
        <title>Contact Matthew</title>
        <meta name='description' content='Send Matthew a Message!' />
      </Head>
      <ContactForm />
    </>
  );
}

export default Contact;
