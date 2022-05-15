import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { EditPostForm } from '@/components/EditPostForm';
import { fetchSinglePost, deletePost } from '@/api/postsAPI';
import styles from './styles.module.css';

export const PostDetails = ({ match, history }) => {
  const [editMode, setEditMode] = useState(false);
  const currentPost = useSelector((state) => state.posts.currentPost);
  const { id } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const timeSince = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    history.push('/posts');
  };

  return (
    <div>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.controls}>
            <button className={styles.editBtn} onClick={openEditMode}>
              Edit
            </button>
            <button className={styles.deleteBtn} onClick={removePost}>
              Delete
            </button>
          </div>
          <div className={styles.imageContainer}>
            {currentPost?.image && (
              <img className={styles.image} src={currentPost?.image} alt="img" />
            )}
          </div>
          <h5 className={styles.title}>{currentPost?.title}</h5>
          <p className={styles.subtitle}>{currentPost?.subtitle}</p>
          <p className={styles.time}>{timeSince(currentPost?.createdAt)}</p>
          <span className={styles.tag}>{currentPost?.tag}</span>
          <p className={styles.content}>{currentPost?.content}</p>
        </div>
      )}
      ;
    </div>
  );
};
