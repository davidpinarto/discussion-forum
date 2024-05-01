/**
 * - RegisterForm React Testing Library
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { RegisterForm } from './RegisterForm';

expect.extend(matchers);

describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    const { getByPlaceholderText } = render(<RegisterForm register={() => {}} />);
    const nameInput = getByPlaceholderText('Name');

    fireEvent.change(nameInput, { target: { value: 'hebat sekali' } });

    expect(nameInput).toHaveValue('hebat sekali');
  });

  it('should handle email typing correctly', async () => {
    const { getByPlaceholderText } = render(<RegisterForm register={() => {}} />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: 'hebatsekali@email.com' } });

    expect(emailInput).toHaveValue('hebatsekali@email.com');
  });

  it('should handle password typing correctly', async () => {
    const { getByPlaceholderText } = render(<RegisterForm register={() => {}} />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: 'hebatsekali' } });

    expect(passwordInput).toHaveValue('hebatsekali');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    const { getByPlaceholderText, getByRole } = render(<RegisterForm register={mockRegister} />);
    const nameInput = getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'hebat sekali' } });
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'hebatsekali@email.com' } });
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'hebatsekali' } });
    const registerButton = getByRole('button', { name: 'Register' });

    fireEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'hebat sekali',
      email: 'hebatsekali@email.com',
      password: 'hebatsekali',
    });
  });
});
