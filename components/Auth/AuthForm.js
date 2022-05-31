import React, { useRef, useState } from 'react';
import styles from './AuthForm.module.css';

async function createUser(email, password) {
  const response = await fetch(`/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went terribly, unimaginably wrong!');
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // TODO: Validate

    if (isLogin) {
      //   Log the user in
    } else {
      try {
        const result = await createUser(emailInputRef.current.value, passwordInputRef.current.value);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' required ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' required ref={passwordInputRef} />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button type='button' className={styles.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create New Account' : 'Login with Existing Account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
