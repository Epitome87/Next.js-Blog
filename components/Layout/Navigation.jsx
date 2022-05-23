import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a>
          {/* TODO: Image logo eventually? */}
          <p className={styles.logo}>MBM</p>
        </a>
      </Link>
      <nav>
        <ul className={styles.NavItems}>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
