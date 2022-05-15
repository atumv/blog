import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const Post = (props) => {
  const { title, subtitle, content, tag, image, createdAt, _id } = props;

  const timeSince = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className={styles.post}>
      {image && (
        <div
          className={styles.image}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      )}
      <h6 className={styles.time}>{timeSince(createdAt)}</h6>
      <Link to={`/posts/${_id}`}>
        <h6 className={styles.title}>{title}</h6>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.content}>{content.substring(0, 250) + '...'}</p>
      </Link>
      <span className={styles.tag}>{`${tag}`}</span>
    </div>
  );
};
