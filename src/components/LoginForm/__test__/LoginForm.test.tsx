import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from '..';
import { apiClient } from '@/services';

vi.mock('@/services', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

vi.mock('@/constants', () => ({
  ERROR_TAGS: {
    VALIDATION_ERROR: 'ValidationError',
  },
  ROUTER: {
    HOME: '/home',
  },
}));

vi.mock('@/i18n', () => ({
  loadContent: () => ({
    title: 'Login',
    fields: {
      identifier: {
        ariaLabel: 'Email',
        placeholder: 'Enter email',
      },
      password: {
        ariaLabel: 'Password',
        placeholder: 'Enter password',
      },
    },
    actions: {
      forgotPassword: { label: 'Forgot password?' },
      submit: {
        label: 'Login',
        loadingLabel: 'Logging in...',
      },
    },
    signup: {
      title: 'New here?',
      description: 'Create an account',
    },
    errors: {
      required: 'Required',
      invalidEmail: 'Invalid email',
      invalidCredentials: 'Invalid credentials',
      something: 'Something went wrong',
    },
  }),
}));

const postMock = vi.mocked(apiClient.post);

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows required validation errors', async () => {
    render(<LoginForm locale="en" />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findAllByText('Required')).toHaveLength(2);
  });

  it('shows invalid email error', async () => {
    render(<LoginForm locale="en" />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Enter email'), 'invalid');
    await user.type(screen.getByPlaceholderText('Enter password'), '123456');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  it('calls login API with correct payload', async () => {
    postMock.mockResolvedValueOnce({
      data: { jwt: 'token' },
      error: null,
    });

    render(<LoginForm locale="en" />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Enter email'), 'test@mail.com');
    await user.type(screen.getByPlaceholderText('Enter password'), '123456');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith('/api/auth/login', {
        body: {
          identifier: 'test@mail.com',
          password: '123456',
        },
      });
    });
  });

  // it('shows loading state while submitting', async () => {
  //     postMock.mockImplementation(
  //         () =>
  //             new Promise((resolve) =>
  //                 setTimeout(() => resolve({ data: { jwt: 'token' }, error: null }), 50),
  //             ),
  //     );

  //     render(<LoginForm locale="en" />);
  //     const user = userEvent.setup();

  //     await user.type(screen.getByPlaceholderText('Enter email'), 'test@mail.com');
  //     await user.type(screen.getByPlaceholderText('Enter password'), '123456');
  //     await user.click(screen.getByRole('button', { name: 'Login' }));

  //     expect(await screen.findByText('Logging in...')).toBeInTheDocument();
  //     expect(screen.getByRole('button')).toBeDisabled();
  // });

  it('shows API validation error', async () => {
    postMock.mockResolvedValueOnce({
      data: null,
      error: { name: 'ValidationError', message: 'Invalid credentials' },
    });

    render(<LoginForm locale="en" />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Enter email'), 'test@mail.com');
    await user.type(screen.getByPlaceholderText('Enter password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });

  it('shows generic error when request fails', async () => {
    postMock.mockRejectedValueOnce(new Error('Network error'));

    render(<LoginForm locale="en" />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Enter email'), 'test@mail.com');
    await user.type(screen.getByPlaceholderText('Enter password'), '123456');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
