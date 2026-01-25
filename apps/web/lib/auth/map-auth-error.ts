import axios from 'axios';

export function mapAuthError(err: unknown) {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      return {
        errors: { _form: ['Invalid email or password'] },
        status: 'error',
      };
    }

    return {
      errors: { _form: ['Something went wrong. Please try again.'] },
      status: 'error',
    };
  }

  console.log(err);
  return {
    errors: { _form: ['An unexpected error occurred'] },
    status: 'error',
  };
}
