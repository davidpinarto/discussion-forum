import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../components/LoginForm';
import { asyncSetAuthUser } from '../states/authUser/action';

export function LoginPage() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  if(authUser) {
    navigate('/')
  }

  return (
    <div className="login-container">
      <div id="login-page">
        <h1>Login</h1>
        <LoginForm login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
