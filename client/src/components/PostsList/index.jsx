import React from 'react';
import { useSelector } from 'react-redux';
import { Post } from '@/components/Post';
import styles from './styles.module.css';

export const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div className={styles.wrapper}>
      {posts.length > 0 && posts.map((post, idx) => <Post key={idx} {...post} />)}
    </div>
  );
};
