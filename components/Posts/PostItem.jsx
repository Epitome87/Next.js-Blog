import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PostItem.module.css';

function PostItem({ post }) {
  const { date, excerpt, image, slug, title } = post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <div className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={styles.image}>
            <Image src={imagePath} alt={title} width={300} height={200} layout='responsive' />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default PostItem;
