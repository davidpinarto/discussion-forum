import React from 'react';
import useInput from '../hooks/useInput';

export function AddThreadForm({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <form className="add-thread-form">
      <label htmlFor="title"><strong>Title</strong></label>
      <input type="text" value={title} onChange={onTitleChange} placeholder="title" />
      <label htmlFor="category"><strong>Category</strong></label>
      <input type="text" value={category} onChange={onCategoryChange} placeholder="category" />
      <label htmlFor="body"><strong>Content</strong></label>
      <textarea type="text" value={body} onChange={onBodyChange} placeholder="content" />
      <button className="btn" type="button" onClick={() => addThread({ title, body, category })}>Add Thread</button>
    </form>
  );
}
