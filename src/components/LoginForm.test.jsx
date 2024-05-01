/**
 * - LoginForm React Testing Library
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import {
  cleanup, render, fireEvent,
} from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { LoginForm } from './LoginForm';

expect.extend(matchers);

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', () => {
    const { getByPlaceholderText } = render(<LoginForm login={() => {}} />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: 'hebatsekali@email.com' } });

    expect(emailInput).toHaveValue('hebatsekali@email.com');
  });

  it('should handle password typing correctly', () => {
    const { getByPlaceholderText } = render(<LoginForm login={() => {}} />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: 'hebatsekali' } });

    expect(passwordInput).toHaveValue('hebatsekali');
  });

  it('should call login function when login button is clicked', () => {
    const mockLogin = vi.fn();
    const { getByPlaceholderText, getByRole } = render(<LoginForm login={mockLogin} />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'hebatsekali@email.com' } });
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'hebatsekali' } });
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'hebatsekali@email.com',
      password: 'hebatsekali',
    });
  });
});
