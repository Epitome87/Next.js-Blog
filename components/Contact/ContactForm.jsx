import React, { useEffect, useState } from 'react';
import Notification from '../UI/Notification';
import styles from './ContactForm.module.css';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went terribly, terribly wrong!');
  }
}

function ContactForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', or 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [requestStatus]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({ email, message, name });
      setRequestStatus('success');

      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      setRequestStatus('error');
      setRequestError(error.message);
    }
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending Message',
      message: 'Your message is being sent!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Your message was sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' required value={name} onChange={(event) => setName(event.target.value)} />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            cols='30'
            rows='5'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={styles.actions}>
          <button type='submit'>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
    </section>
  );
}

export default ContactForm;
