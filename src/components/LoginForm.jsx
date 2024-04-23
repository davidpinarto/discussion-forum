import React from 'react';
import useInput from '../hooks/useInput';

export function LoginForm({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-form">
      <label htmlFor="email"><strong>Email</strong></label>
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
      <label htmlFor="password"><strong>Password</strong></label>
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button type="button" onClick={() => login({ email, password })}>Login</button>
    </form>
  );
}
