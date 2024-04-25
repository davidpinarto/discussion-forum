import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AddThreadForm } from '../components/AddThreadForm';
import { asyncAddNewThreads } from '../states/threads/action';

export function AddThreadPage() {
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (authUser === null) {
      alert('You must be login to add a new thread!');
      navigate('/login');
    }
  }, []);

  const onAddThread = async (newThread) => {
    dispatch(asyncAddNewThreads(newThread));
    navigate('/');
  };

  return (
    <div className="add-thread-container">
      <div id="add-thread-page">
        <AddThreadForm addThread={onAddThread} />
      </div>
    </div>
  );
}
