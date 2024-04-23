import React from 'react';
import useInput from '../hooks/useInput';

export function RegisterForm({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="register-form">
      <label htmlFor="text"><strong>Name</strong></label>
      <input type="text" value={name} onChange={onNameChange} placeholder="Name" />
      <label htmlFor="email"><strong>Email</strong></label>
      <input type="text" value={email} onChange={onEmailChange} placeholder="Email" />
      <label htmlFor="password"><strong>Password</strong></label>
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button className="btn" type="button" onClick={() => register({ name, email, password })}>Register</button>
    </form>
  );
}
