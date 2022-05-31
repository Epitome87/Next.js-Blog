import ReactDOM from 'react-dom';
import React from 'react';
import styles from './Notification.module.css';

function Notification({ message, status, title }) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.querySelector('#notifications')
  );
}

export default Notification;
