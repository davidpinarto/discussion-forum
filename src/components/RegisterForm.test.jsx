import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { RegisterForm } from './RegisterForm';

expect.extend(matchers);

describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterForm register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    await userEvent.type(nameInput, 'hebat sekali');

    expect(nameInput).toHaveValue('hebat sekali');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterForm register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'hebatsekali@email.com');

    expect(emailInput).toHaveValue('hebatsekali@email.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterForm register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'hebatsekali');

    expect(passwordInput).toHaveValue('hebatsekali');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterForm register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'hebat sekali');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'hebatsekali@email.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'hebatsekali');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'hebat sekali',
      email: 'hebatsekali@email.com',
      password: 'hebatsekali',
    });
  });
});
