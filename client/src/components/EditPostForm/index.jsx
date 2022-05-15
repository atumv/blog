import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePost } from '@/api/postsAPI';
import { tags } from '@/shared/constants';
import { postSchema } from '@/shared/postSchema';
import styles from './styles.module.css';

export const EditPostForm = ({ post, closeEditMode }) => {
  const [file, setFile] = useState(post?.image);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      ...data,
      image: file,
    };

    dispatch(updatePost(post._id, updatedPost));
    reset();
    setFile(null);
    closeEditMode();
  };

  return (
    <form className={styles.form} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.titleInput}
        defaultValue={post?.title}
        {...register('title', { required: true })}
      />
      <input
        className={styles.subtitleInput}
        defaultValue={post?.subtitle}
        {...register('subtitle', { required: true })}
      />
      <Controller
        name="tag"
        render={({ field }) => (
          <select className={styles.select} {...field}>
            {tags.map((tag, index) => (
              <option key={index}>{tag}</option>
            ))}
          </select>
        )}
        control={control}
        defaultValue={post?.tag}
      />
      <textarea
        className={styles.contentInput}
        defaultValue={post?.content}
        {...register('content', { required: true })}
      />
      {errors.title && <span className={styles.errorMsg}>Title is required</span>}
      {errors.subtitle && <span className={styles.errorMsg}>Subtitle is required</span>}
      {errors.content && <span className={styles.errorMsg}>Content is required</span>}
      <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelBtn} onClick={closeEditMode}>
          Cancel
        </button>
        <button className={styles.updateBtn} type="submit">
          Update
        </button>
      </div>
    </form>
  );
};
