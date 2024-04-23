import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterForm } from '../components/RegisterForm';
import { asyncRegisterUser } from '../states/users/action';

export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div id="register-page">
        <h1>Register</h1>
        <RegisterForm register={onRegister} />
        <p>
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
