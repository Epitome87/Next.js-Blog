import React from 'react';
// import Image from 'next/image';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <img className={styles.image} src='/images/matthew.png' alt='Matthew' width={300} height={300}></img>
      <h1>Hello, I am Matthew</h1>
      <p>I blog about web development</p>
    </section>
  );
}

export default Hero;
