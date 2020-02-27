import React from 'react';
import PostProvider from './components/PostProvider/PostProvider';
import Posts from './components/Posts/Posts';
import EditPostForm from './components/EditPostForm/EditPostForm';

export default function App() {
  return (
    <div>
      <PostProvider>
        <EditPostForm />
        <Posts />
      </PostProvider>
    </div>
  )
}

