import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from '@/api/postsAPI';
import { AddPostForm } from '@/components/AddPostForm';
import { PostsList } from '@/components/PostsList';
import { PostDetails } from '@/components/PostDetails';
import styles from './styles.module.css';

const App = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <h1>
            <Link className={styles.header} to="/posts">
              Blog
            </Link>
          </h1>
          <Route
            exact
            path="/posts"
            component={() => (
              <button className={styles.addBtn} onClick={handleOpen}>
                New Post
              </button>
            )}
          />
        </div>
      </div>
      <div className={styles.container}>
        <Switch>
          <Route exact path="/posts" component={PostsList} />
          <Route exact path="/posts/:id" component={PostDetails} />
        </Switch>
      </div>
      {open && <AddPostForm handleClose={handleClose} />}
    </div>
  );
};

export default App;
